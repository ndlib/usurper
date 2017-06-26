import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_SERVICEPOINTS = 'CF_REQUEST_SERVICEPOINTS'
export const requestServicePoints = () => {
  return {
    type: CF_REQUEST_SERVICEPOINTS,
  }
}

export const CF_RECEIVE_SERVICEPOINTS = 'CF_RECEIVE_SERVICEPOINTS'
const receiveServicePoints = (response) => {
  let error = {
    type: CF_RECEIVE_SERVICEPOINTS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_SERVICEPOINTS,
    status: statuses.SUCCESS,
    servicePoints: response,
    receivedAt: Date.now(),
  }

  try {
    if (response) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchServicePoints = (status) => {
  let url = `${Config.contentfulAPI}/contentType/servicePoint?status=${status}`
  return dispatch => {
    dispatch(requestServicePoints())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveServicePoints(json)))
      .catch(response => dispatch(receiveServicePoints(response)))
  }
}
