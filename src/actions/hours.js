import fetch from 'isomorphic-fetch'
import { hoursAPIURL } from '../../config/secrets.js'
import * as statuses from '../constants/APIStatuses'

export const HOURS_REQUEST = 'HOURS_REQUEST'
export const HOURS_RECEIVE = 'HOURS_RECEIVE'
export const HOURS_NO_SUCH = 'HOURS_NO_SUCH'

export const requestHours = () => {
  return {
    type: HOURS_REQUEST
  }
}

function receiveHours (response) {
  if (response == 'TypeError: Failed to fetch') {
    return {
      type: HOURS_RECEIVE,
      status: statuses.ERROR,
      error: response,
      receivedAt: Date.now()
    }
  } else {
    return {
      type: HOURS_RECEIVE,
      status: statuses.SUCCESS,
      hours: response,
      receivedAt: Date.now()
    }
  }
}

export function fetchHours () {
  return dispatch => {
    dispatch(requestHours())
    return fetch(hoursAPIURL)
      .then(response => response.json())
      .then(json => dispatch(receiveHours(json)))
      .catch(error => dispatch(receiveHours(error)))
  }
}
