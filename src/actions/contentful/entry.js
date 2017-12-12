import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_ENTRY = 'CF_REQUEST_ENTRY'
export const requestEntry = (entry) => {
  return {
    type: CF_REQUEST_ENTRY,
    entry,
  }
}

export const CF_RECEIVE_ENTRY = 'CF_RECEIVE_ENTRY'
const receiveEntry = (entry, response) => {
  let error = {
    type: CF_RECEIVE_ENTRY,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
    receivedAt: Date.now(),
    entry,
  }

  let success = {
    type: CF_RECEIVE_ENTRY,
    status: statuses.SUCCESS,
    page: response,
    receivedAt: Date.now(),
    entry,
  }

  try {
    if (response.sys.id) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchEntry = (id, slug, preview) => {
  let identifierParam
  let entryIdent
  if (slug) {
    identifierParam = `slug=${encodeURIComponent(slug)}`
    entryIdent = slug
  }
  if (id) {
    identifierParam = `id=${encodeURIComponent(id)}`
    entryIdent = id
  }
  let url = `${Config.contentfulAPI}/entry?locale=en-US&${identifierParam}&preview=${preview}`
  return (dispatch, getState) => {
    dispatch(requestEntry(entryIdent))

    let login = getState().personal.login
    let headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}
    return fetch(url, { headers })
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveEntry(entryIdent, json)))
      .catch(response => dispatch(receiveEntry(entryIdent, response)))
  }
}
