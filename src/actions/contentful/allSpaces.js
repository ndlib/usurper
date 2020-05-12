import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALL_SPACES = 'CF_REQUEST_ALL_SPACES'
export const requestAllSpaces = () => {
  return {
    type: CF_REQUEST_ALL_SPACES,
  }
}

export const CF_RECEIVE_ALL_SPACES = 'CF_RECEIVE_ALL_SPACES'
const receiveAllSpaces = (response) => {
  const error = {
    type: CF_RECEIVE_ALL_SPACES,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALL_SPACES,
    status: statuses.SUCCESS,
    allSpaces: response,
    receivedAt: Date.now(),
  }

  if (typy(response).isArray) {
    return success
  } else {
    return error
  }
}

export const fetchAllSpaces = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=space&include=1', preview)

  return dispatch => {
    dispatch(requestAllSpaces())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllSpaces(json)))
      .catch(response => dispatch(receiveAllSpaces(response)))
  }
}
