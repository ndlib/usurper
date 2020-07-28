import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_MEETING_SPACES = 'CF_REQUEST_MEETING_SPACES'
export const requestMeetingSpaces = {
  type: CF_REQUEST_MEETING_SPACES,
}

export const CF_RECEIVE_MEETING_SPACES = 'CF_RECEIVE_MEETING_SPACES'
const receiveMeetingSpaces = (response) => {
  const error = {
    type: CF_RECEIVE_MEETING_SPACES,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_MEETING_SPACES,
    status: statuses.SUCCESS,
    spaces: response,
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

export const fetchMeetingSpaces = (preview) => {
  const url = helper.getContentfulQueryUrl(`content_type=space&include=3`, preview)

  return dispatch => {
    dispatch(requestMeetingSpaces)
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveMeetingSpaces(json)))
      .catch(response => dispatch(receiveMeetingSpaces(response)))
  }
}
