import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    page,
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
const receivePage = (page, response) => {
  let error = {
    type: CF_RECEIVE_PAGE,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_PAGE,
    status: statuses.SUCCESS,
    page: response,
    receivedAt: Date.now(),
  }

  try {
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

export const fetchPage = (page, preview) => {
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=${page}&preview=${preview}`
  return (dispatch, getState) => {
    dispatch(requestPage(page))

    let login = getState().personal.login
    let headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}
    return fetch(url, { headers })
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receivePage(page, json)))
      .catch(response => dispatch(receivePage(page, response)))
  }
}
