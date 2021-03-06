import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ENTRY = 'CF_REQUEST_ENTRY'
export const requestEntry = (entry) => {
  return {
    type: CF_REQUEST_ENTRY,
    entry,
  }
}

export const CF_RECEIVE_ENTRY = 'CF_RECEIVE_ENTRY'
const receiveEntry = (entry, response) => {
  const error = {
    type: CF_RECEIVE_ENTRY,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
    receivedAt: Date.now(),
    entry,
  }

  const success = {
    type: CF_RECEIVE_ENTRY,
    status: statuses.SUCCESS,
    page: response[0],
    receivedAt: Date.now(),
    entry,
  }

  try {
    if (response[0] && response[0].sys.id) {
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
  /*
  // I think this is unused. If it is used, this query wouldn't work anyway.
  if (slug) {

    identifierParam = encodeURIComponent(`slug=${slug}`)
    entryIdent = slug
  }
  */
  if (id) {
    identifierParam = `sys.id=${id}&include=3`
    entryIdent = id
  }
  const url = helper.getContentfulQueryUrl(identifierParam, preview)

  return (dispatch, getState) => {
    dispatch(requestEntry(entryIdent))

    const login = getState().personal.login
    const headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}
    return fetch(url, { headers })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response.status
        }
      })
      .then(json => {
        dispatch(receiveEntry(entryIdent, json))
      })
      .catch(response => dispatch(
        receiveEntry(entryIdent, response)))
  }
}
