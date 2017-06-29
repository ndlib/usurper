import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_EVENT = 'CF_REQUEST_EVENT'
export const requestEvent = (event) => {
  return {
    type: CF_REQUEST_EVENT,
    event,
  }
}

export const CF_RECEIVE_EVENT = 'CF_RECEIVE_EVENT'
const receiveEvent = (event, response) => {
  let error = {
    type: CF_RECEIVE_EVENT,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_EVENT,
    status: statuses.SUCCESS,
    event: response,
    receivedAt: Date.now(),
  }

  try {
    if (response.sys.contentType.sys.id === 'event') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchEvent = (event, preview) => {
  const eventEnc = encodeURIComponent(event)
  let url = `${Config.contentfulAPI}/entry?locale=en-US&slug=${eventEnc}&preview=${preview}`
  return (dispatch) => {
    dispatch(requestEvent(event))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveEvent(event, json)))
      .catch(response => dispatch(receiveEvent(event, response)))
  }
}
