import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALL_REDIRECTS = 'CF_REQUEST_ALL_REDIRECTS'
export const requestAllRedirects = () => {
  return {
    type: CF_REQUEST_ALL_REDIRECTS,
  }
}

export const CF_RECEIVE_ALL_REDIRECTS = 'CF_RECEIVE_ALL_REDIRECTS'
const receiveAllRedirects = (response) => {
  const error = {
    type: CF_RECEIVE_ALL_REDIRECTS,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
  }

  const success = {
    type: CF_RECEIVE_ALL_REDIRECTS,
    status: statuses.SUCCESS,
    allRedirects: response,
  }

  if (typy(response).isArray) {
    return success
  } else {
    return error
  }
}

export const fetchAllRedirects = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=redirect&include=2', preview, false, true)

  return dispatch => {
    dispatch(requestAllRedirects())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllRedirects(json)))
      .catch(response => dispatch(receiveAllRedirects(response)))
  }
}
