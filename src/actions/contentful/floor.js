import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_FLOOR = 'CF_REQUEST_FLOOR'
export const requestFloor = (floor) => {
  return {
    type: CF_REQUEST_FLOOR,
    floor,
  }
}

export const CF_RECEIVE_FLOOR = 'CF_RECEIVE_FLOOR'
const receiveFloor = (floor, response) => {
  let error = {
    type: CF_RECEIVE_FLOOR,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_FLOOR,
    status: statuses.SUCCESS,
    floor: response,
    receivedAt: Date.now(),
  }

  try {
    if (response.sys.contentType.sys.id === 'floor') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchFloor = (floor, preview) => {
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=${floor}&preview=${preview}`
  return dispatch => {
    dispatch(requestFloor(floor))
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveFloor(floor, json)))
      .catch(response => dispatch(receiveFloor(floor, response)))
  }
}
