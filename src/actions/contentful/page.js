import fetch from 'isomorphic-fetch'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    page
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
export const CF_NO_SUCH_PAGE = 'CF_NO_SUCH_PAGE'
function receivePage (page, response) {
  let error = {
    type: CF_RECEIVE_PAGE,
    status: statuses.ERROR,
    error: response,
    receivedAt: Date.now()
  }

  let success = {
    type: CF_RECEIVE_PAGE,
    status: statuses.SUCCESS,
    page: response,
    receivedAt: Date.now()
  }

  try{
    if (response.sys.contentType.sys.id === 'page') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
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

export function fetchPage (page) {
  let url = `/${page}.json`
  return (dispatch, getState) => {
    dispatch(requestPage(page))

    let login = getState().personal.login
    let headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}
    return fetch(url, {
      headers: headers,
    })
      .then(response => response.json())
      .then(json => dispatch(receivePage(page, json)))
      .catch(response => dispatch(receivePage(page, response)))
  }
}
