import fetch from 'isomorphic-fetch'
import * as statuses from '../constants/APIStatuses'
import Config from '../shared/Configuration'

export const HOURS_REQUEST = 'HOURS_REQUEST'
export const HOURS_RECEIVE = 'HOURS_RECEIVE'
export const HOURS_NO_SUCH = 'HOURS_NO_SUCH'

export const requestHours = () => {
  return {
    type: HOURS_REQUEST,
  }
}

const receiveHours = (response) => {
  if (response === 'TypeError: Failed to fetch') {
    return {
      type: HOURS_RECEIVE,
      status: statuses.ERROR,
      error: response,
      receivedAt: Date.now(),
    }
  } else {
    return {
      type: HOURS_RECEIVE,
      status: statuses.SUCCESS,
      hours: response,
      receivedAt: Date.now(),
    }
  }
}

export const fetchHours = () => {
  return dispatch => {
    dispatch(requestHours())
    let url = Config.hoursAPIURL + "/hours"
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveHours(json)))
      .catch(error => dispatch(receiveHours(error)))
  }
}
