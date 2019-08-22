import Config from 'shared/Configuration'
import QueryString from 'querystring'

export const SET_SEARCH = 'SET_SEARCH'
export const OPEN_SEARCHBOX = 'OPEN_SEARCHBOX'
export const CLOSE_SEARCHBOX = 'CLOSE_SEARCHBOX'
export const OPEN_ADVANCED_SEARCH = 'OPEN_ADVANCED_SEARCH'
export const CLOSE_ADVANCED_SEARCH = 'CLOSE_ADVANCED_SEARCH'
export const SAVE_SEARCH_PREFERENCE = 'SAVE_SEARCH_PREFERENCE'
export const CLEAR_SEARCH_PREFERENCE = 'CLEAR_SEARCH_PREFERENCE'
export const OPEN_SEARCHDRAWER = 'OPEN_SEARCHDRAWER'
export const CLOSE_SEARCHDRAWER = 'CLOSE_SEARCHDRAWER'
export const SITE_SEARCH_REQUEST = 'SITE_SEARCH_REQUEST'
export const SITE_SEARCH_RESPONSE = 'SITE_SEARCH_RESPONSE'

export const setSearchType = (searchType) => {
  return {
    type: SET_SEARCH,
    searchType,
  }
}
export const openSearchBox = () => {
  return {
    type: OPEN_SEARCHBOX,
  }
}

export const closeSearchBox = () => {
  return {
    type: CLOSE_SEARCHBOX,
  }
}

export const openAdvancedSearch = () => {
  return {
    type: OPEN_ADVANCED_SEARCH,
  }
}

export const closeAdvancedSearch = () => {
  return {
    type: CLOSE_ADVANCED_SEARCH,
  }
}

export const saveSearchPreference = (pref) => {
  return {
    type: SAVE_SEARCH_PREFERENCE,
    pref,
  }
}

export const clearSearchPreference = () => {
  return {
    type: CLEAR_SEARCH_PREFERENCE,
  }
}

export const openSearchDrawer = () => {
  return {
    type: OPEN_SEARCHDRAWER,
  }
}

export const closeSearchDrawer = () => {
  return {
    type: CLOSE_SEARCHDRAWER,
  }
}

export const siteSearchRequest = (query) => {
  return {
    type: SITE_SEARCH_REQUEST,
    query,
  }
}
export const siteSearchResponse = (json) => {
  return {
    type: SITE_SEARCH_RESPONSE,
    items: json.items,
    searchInformation: json.searchInformation,
    queries: json.queries,
  }
}

export const fetchResults = (queryString) => {
  return dispatch => {
    dispatch(siteSearchRequest(queryString))
    const qs = queryString ? QueryString.parse(queryString.replace('?', '')) : ''
    fetch(
      'https://www.googleapis.com/customsearch/v1?key=' + Config.gcseKey +
      '&cx=' + Config.gcseCx +
      '&q=' + qs.q +
      '&start=' + (qs.start ? qs.start : '1')
    )
      .then(response => response.json())
      .then(json => dispatch(siteSearchResponse(json)))
  }
}

export const actions = {
  setSearchType,
  openSearchBox,
  closeSearchBox,
  saveSearchPreference,
  clearSearchPreference,
  openSearchDrawer,
  closeSearchDrawer,
}
