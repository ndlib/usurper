import fetch from 'isomorphic-fetch'
import * as statuses from 'constants/APIStatuses'
import Config from 'shared/Configuration'
import typy from 'typy'

export const HOURS_REQUEST = 'HOURS_REQUEST'
export const HOURS_RECEIVE = 'HOURS_RECEIVE'

export const requestHours = () => {
  return {
    type: HOURS_REQUEST,
  }
}

const successResponse = (hours) => {
  return {
    type: HOURS_RECEIVE,
    status: statuses.SUCCESS,
    hours: hours,
    receivedAt: Date.now(),
  }
}

const errorResponse = (errorMessage) => {
  return {
    type: HOURS_RECEIVE,
    status: statuses.ERROR,
    error: errorMessage,
    hours: {},
    receivedAt: Date.now(),
  }
}

const receiveHours = (result) => {
  return typy(result).isObject ? successResponse(result) : errorResponse(result)
}

export const fetchHours = () => {
  return dispatch => {
    dispatch(requestHours())
    const url = `${Config.hoursAPIURL}/hours`
    return fetch(url)
      .then(response => response.ok ? response.json() : response.text())
      .then(json => dispatch(receiveHours(json)))
      .catch(error => dispatch(errorResponse(error)))
  }
}
