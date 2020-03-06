import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_FLOORS = 'CF_REQUEST_FLOORS'
export const requestFloors = (floors) => {
  return {
    type: CF_REQUEST_FLOORS,
    floors,
  }
}

export const CF_RECEIVE_FLOORS = 'CF_RECEIVE_FLOORS'
const receiveFloors = (floor, response) => {
  const error = {
    type: CF_RECEIVE_FLOORS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_FLOORS,
    status: statuses.SUCCESS,
    floor: response,
    receivedAt: Date.now(),
  }

  try {
    if (response[0] && response[0].sys.contentType.sys.id === 'floor') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchFloors = (floors) => {
  const url = helper.getContentfulQueryUrl(`content_type=floor&include=3`)

  return dispatch => {
    dispatch(requestFloors(floors))
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveFloors(floors, json)))
      .catch(response => dispatch(receiveFloors(floors, response)))
  }
}
