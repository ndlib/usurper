import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALL_EVENT_GROUPS = 'CF_REQUEST_ALL_EVENT_GROUPS'
export const requestAllEventGroups = () => {
  return {
    type: CF_REQUEST_ALL_EVENT_GROUPS,
  }
}

export const CF_RECEIVE_ALL_EVENT_GROUPS = 'CF_RECEIVE_ALL_EVENT_GROUPS'
const receiveAllEventGroups = (response) => {
  const error = {
    type: CF_RECEIVE_ALL_EVENT_GROUPS,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALL_EVENT_GROUPS,
    status: statuses.SUCCESS,
    allEventGroups: response,
    receivedAt: Date.now(),
  }

  try {
    if (typy(response).isArray) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchAllEventGroups = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=eventGroup&include=0', preview)

  return dispatch => {
    dispatch(requestAllEventGroups())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllEventGroups(json)))
      .catch(response => dispatch(receiveAllEventGroups(response)))
  }
}
