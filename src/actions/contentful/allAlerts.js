import fetch from 'isomorphic-fetch'
import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALLALERTS = 'CF_REQUEST_ALLALERTS'
export const requestAllAlerts = () => {
  return {
    type: CF_REQUEST_ALLALERTS,
  }
}

export const CF_RECEIVE_ALLALERTS = 'CF_RECEIVE_ALLALERTS'
const receiveAllAlerts = (response) => {
  const error = {
    type: CF_RECEIVE_ALLALERTS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALLALERTS,
    status: statuses.SUCCESS,
    allAlerts: response,
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

export const fetchAllAlerts = (status) => {
  const query = encodeURIComponent('content_type=alert&include=0')
  const preview = status === 'preview'
  let url = `${Config.contentfulAPI}/livequery?locale=en-US&query=${query}&t=${Date.now()}`
  if (preview) {
    url += `&preview=${preview}`
  }

  return dispatch => {
    dispatch(requestAllAlerts())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllAlerts(json)))
      .catch(response => dispatch(receiveAllAlerts(response)))
  }
}
