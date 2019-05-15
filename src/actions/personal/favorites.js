import typy from 'typy'

import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES'
export const REQUEST_FAVORITES = 'REQUEST_FAVORITES'
export const RECEIVE_UPDATE_FAVORITES = 'RECEIVE_UPDATE_FAVORITES'
export const REQUEST_UPDATE_FAVORITES = 'REQUEST_UPDATE_FAVORITES'
export const RECEIVE_SEARCH_FAVORITES = 'RECEIVE_SEARCH_FAVORITES'
export const REQUEST_SEARCH_FAVORITES = 'REQUEST_SEARCH_FAVORITES'

export const KIND = {
  databases: 'dbFavorites',
  subjects: 'subjectFavorites',
}

const requestFavorites = (kind) => {
  return {
    type: REQUEST_FAVORITES,
    kind: kind,
  }
}

const requestUpdateFavorites = (kind) => {
  return {
    type: REQUEST_UPDATE_FAVORITES,
    kind: kind,
  }
}

const requestSearchFavorites = (kind, searchText) => {
  return {
    type: REQUEST_SEARCH_FAVORITES,
    kind: kind,
    searchText: searchText,
  }
}

const receiveFavorites = (kind, state, json) => {
  return {
    type: RECEIVE_FAVORITES,
    kind: kind,
    state: state,
    items: json.items || [],
  }
}

const receiveUpdateFavorites = (kind, state, error) => {
  return {
    type: RECEIVE_UPDATE_FAVORITES,
    kind: kind,
    state: state,
    error: error,
  }
}

const receiveSearchFavorites = (kind, searchText, state, results) => {
  return {
    type: RECEIVE_SEARCH_FAVORITES,
    kind: kind,
    searchText: searchText,
    state: state,
    results: results || [],
  }
}

export const getFavorites = (kind) => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(requestFavorites(kind))
    const url = Config.userPrefsAPI + 'favorites/' + kind
    return fetch(url, {
      method: 'get',
      headers: { 'Authorization': state.login.token },
    })
      .then(response => response.json())
      .then(json => dispatch(
        receiveFavorites(kind, statuses.SUCCESS, json)
      ))
      .catch((e) => {
        console.error(e)
        dispatch(receiveFavorites(kind, statuses.ERROR, e))
      })
  }
}

export const getAllFavorites = () => {
  return (dispatch) => {
    for (const key in KIND) {
      dispatch(getFavorites(KIND[key]))
    }
  }
}

export const addFavorite = (kind, key, title, faveUrl) => {
  return (dispatch, getState) => {
    const state = getState().personal

    dispatch(requestUpdateFavorites(kind))

    const fetchUrl = `${Config.userPrefsAPI}favorites/${kind}/${key}`
    return fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Authorization': state.login.token },
      body: JSON.stringify({
        title: title,
        url: faveUrl,
      }),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFavorites(kind, statuses.SUCCESS, json))
        dispatch(receiveUpdateFavorites(kind, statuses.SUCCESS))
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveUpdateFavorites(kind, statuses.ERROR, e))
      })
  }
}

export const removeFavorite = (kind, key) => {
  return (dispatch, getState) => {
    const state = getState().personal

    dispatch(requestUpdateFavorites(kind))

    const url = `${Config.userPrefsAPI}favorites/${kind}/${key}`
    return fetch(url, {
      method: 'DELETE',
      headers: { 'Authorization': state.login.token },
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFavorites(kind, statuses.SUCCESS, json))
        dispatch(receiveUpdateFavorites(kind, statuses.SUCCESS))
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveUpdateFavorites(kind, statuses.ERROR, e))
      })
  }
}

export const setFavorites = (kind, favorites) => {
  return (dispatch, getState) => {
    const state = getState().personal

    dispatch(requestUpdateFavorites(kind))

    const fetchUrl = `${Config.userPrefsAPI}favorites/${kind}`
    return fetch(fetchUrl, {
      method: 'POST',
      headers: { 'Authorization': state.login.token },
      body: JSON.stringify(favorites),
    })
      .then(response => response.json())
      .then(json => {
        dispatch(receiveFavorites(kind, statuses.SUCCESS, json))
        dispatch(receiveUpdateFavorites(kind, statuses.SUCCESS))
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveUpdateFavorites(kind, statuses.ERROR, e))
      })
  }
}

export const clearUpdateFavorites = (kind) => {
  return (dispatch) => {
    dispatch(receiveUpdateFavorites(kind, statuses.NOT_FETCHED))
  }
}

const convertDatabaseToFavorite = (database) => {
  const output = []

  if (database.fields && database.fields.urls) {
    // If a database has more than one url, each one is treated as its own favorite
    for (let j = 0; j < database.fields.urls.length; j++) {
      const urlField = database.fields.urls[j]
      output.push({
        key: database.sys.id + '_link_' + j,
        title: database.fields.title + (database.fields.urls.length > 1 ? ' - ' + urlField.title : ''),
        url: urlField.url,
      })
    }
  } else {
    output.push({
      key: database.sys.id + '_link_0',
      title: database.fields.title,
      url: database.fields.purl,
    })
  }

  return output
}

const convertSubjectToFavorite = (subject) => {
  return {
    key: subject.sys.id,
    title: (typy(subject, 'fields.usePageTitle').safeBoolean && typy(subject, 'fields.page').isObject)
      ? typy(subject, 'fields.page.fields.title').safeString
      : typy(subject, 'fields.title').safeString,
    url: '/' + typy(subject, 'fields.page.fields.slug').safeString,
    order: subject.order,
  }
}

// Takes the contentful response and flattens it into just what we need
export const convertContentfulToFavorites = (jsonArr, kind) => {
  let output = []

  for (const arrKey in jsonArr) {
    const result = jsonArr[arrKey]

    if (!result.fields) {
      continue // We don't have enough data to do anything else
    }

    if (kind === KIND.databases) {
      output = output.concat(convertDatabaseToFavorite(result))
    } else if (kind === KIND.subjects) {
      output.push(convertSubjectToFavorite(result))
    }
  }

  return output
}

// Technically this searches for favoritable content, not favorites data itself
export const searchFavorites = (kind, searchText) => {
  return (dispatch) => {
    if (!searchText) {
      dispatch(receiveSearchFavorites(kind, '', statuses.NOT_FETCHED, []))
      return
    }

    dispatch(requestSearchFavorites(kind, searchText))

    let url = Config.contentfulAPI + 'query?locale=en-US&query='
    if (kind === KIND.databases) {
      url += encodeURIComponent(`content_type=resource&include=0&fields.title[match]=${searchText}`)
    } else if (kind === KIND.subjects) {
      url += encodeURIComponent(`content_type=internalLink&fields.context=Subject&include=2`)
    }

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(
        receiveSearchFavorites(kind, searchText, statuses.SUCCESS, convertContentfulToFavorites(json, kind))
      ))
      .catch((e) => {
        console.error(e)
        dispatch(receiveSearchFavorites(kind, searchText, statuses.ERROR, e))
      })
  }
}
