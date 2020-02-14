import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALL_EXHIBITS = 'CF_REQUEST_ALL_EXHIBITS'
export const requestAllExhibits = () => {
  return {
    type: CF_REQUEST_ALL_EXHIBITS,
  }
}

export const CF_RECEIVE_ALL_EXHIBITS = 'CF_RECEIVE_ALL_EXHIBITS'
const receiveAllExhibits = (response) => {
  const error = {
    type: CF_RECEIVE_ALL_EXHIBITS,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALL_EXHIBITS,
    status: statuses.SUCCESS,
    allExhibits: response,
    receivedAt: Date.now(),
  }

  if (typy(response).isArray) {
    return success
  } else {
    return error
  }
}

export const fetchAllExhibits = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=exhibit&include=2', preview)

  return dispatch => {
    dispatch(requestAllExhibits())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllExhibits(json)))
      .catch(response => dispatch(receiveAllExhibits(response)))
  }
}
