import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALLEVENTS = 'CF_REQUEST_ALLEVENTS'
export const requestAllEvents = () => {
  return {
    type: CF_REQUEST_ALLEVENTS,
  }
}

export const CF_RECEIVE_ALLEVENTS = 'CF_RECEIVE_ALLEVENTS'
const receiveAllEvents = (response, eventGroups) => {
  const error = {
    type: CF_RECEIVE_ALLEVENTS,
    status: statuses.fromHttpStatusCode(response.status),
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALLEVENTS,
    status: statuses.SUCCESS,
    allEvents: response,
    allEventGroups: eventGroups,
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

export const fetchAllEvents = (preview, eventGroups) => {
  const url = helper.getContentfulQueryUrl('content_type=event&include=2', preview)

  return dispatch => {
    dispatch(requestAllEvents())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllEvents(json, eventGroups)))
      .catch(response => dispatch(receiveAllEvents(response, eventGroups)))
  }
}
