import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALLEVENTS = 'CF_REQUEST_ALLEVENTS'
export const requestAllEvents = () => {
  return {
    type: CF_REQUEST_ALLEVENTS,
  }
}

export const CF_RECEIVE_ALLEVENTS = 'CF_RECEIVE_ALLEVENTS'
const receiveAllEvents = (response) => {
  const error = {
    type: CF_RECEIVE_ALLEVENTS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALLEVENTS,
    status: statuses.SUCCESS,
    allEvents: response,
    receivedAt: Date.now(),
  }

  try {
    if (Array.isArray(response)) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchAllEvents = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=event&include=3', preview)

  return dispatch => {
    dispatch(requestAllEvents())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllEvents(json)))
      .catch(response => dispatch(receiveAllEvents(response)))
  }
}
