import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    slug: page,
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
const receiveError = (page, response) => {
  return {
    type: CF_RECEIVE_PAGE,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
    slug: page,
    receivedAt: Date.now(),
  }
}
const receiveSuccess = (page, response) => {
  return {
    type: CF_RECEIVE_PAGE,
    status: statuses.SUCCESS,
    page: response,
    slug: page,
    receivedAt: Date.now(),
  }
}

const receivePage = (page, response) => {
  if (Array.isArray(response)) {
    response = response[0]
  }
  if (response.sys &&
      response.sys.contentType &&
      response.sys.contentType.sys &&
      (response.sys.contentType.sys.id === 'page' || response.sys.contentType.sys.id === 'columnContainer')) {
    return receiveSuccess(page, response)
  }
  return receiveError(page, response)
}

export const CF_CLEAR_PAGE = 'CF_CLEAR_PAGE'
const clearStore = {
  type: CF_CLEAR_PAGE,
}

export function clearPage () {
  return dispatch => {
    dispatch(clearStore)
  }
}

export const fetchPage = (page, preview, secure = false, cfType = 'page') => {
  let endpoint = 'query'
  if (secure) {
    endpoint = 'secureQuery'
  }
  const query = encodeURIComponent(`content_type=${cfType}&fields.slug=${page}&include=5`)
  let url = `${Config.contentfulAPI}${endpoint}?locale=en-US&query=${query}`
  if (preview) { url += encodeURIComponent(`&preview=${preview}`) }

  return (dispatch, getState) => {
    dispatch(requestPage(page))

    let login = getState().personal.login
    let headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}

    return fetch(url, { headers })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response
        }
      })
      .then(json => dispatch(receivePage(page, json)))
      .catch(response => {
        console.log('catch response', response)
        dispatch(receiveError(page, response))
      })
  }
}
