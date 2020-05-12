import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_EVENT = 'CF_REQUEST_EVENT'
export const requestEvent = (event) => {
  return {
    type: CF_REQUEST_EVENT,
    event,
  }
}

export const CF_RECEIVE_EVENT = 'CF_RECEIVE_EVENT'
const receiveEvent = (event, response, eventGroups) => {
  const error = {
    type: CF_RECEIVE_EVENT,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_EVENT,
    status: statuses.SUCCESS,
    event: response[0],
    receivedAt: Date.now(),
    recurring: typy(eventGroups).safeArray.some(group => group.eventIds.includes(response[0].sys.id)),
  }

  try {
    if (response[0] && response[0].sys.contentType.sys.id === 'event') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchEvent = (slug, preview, eventGroups) => {
  const url = helper.getContentfulQueryUrl(`content_type=event&fields.slug=${slug}&include=3`, preview)

  return (dispatch) => {
    dispatch(requestEvent(slug))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveEvent(slug, json, eventGroups)))
      .catch(response => dispatch(receiveEvent(slug, response, eventGroups)))
  }
}
