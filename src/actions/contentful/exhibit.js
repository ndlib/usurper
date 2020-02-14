import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_EXHIBIT = 'CF_REQUEST_EXHIBIT'
export const requestExhibit = (slug) => {
  return {
    type: CF_REQUEST_EXHIBIT,
    slug,
  }
}

export const CF_RECEIVE_EXHIBIT = 'CF_RECEIVE_EXHIBIT'
const receiveExhibit = (slug, response) => {
  const error = {
    type: CF_RECEIVE_EXHIBIT,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    slug,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_EXHIBIT,
    status: statuses.SUCCESS,
    slug,
    exhibit: response[0],
    receivedAt: Date.now(),
  }

  if (typy(response[0], 'sys.contentType.sys.id').safeString === 'exhibit') {
    return success
  } else {
    return error
  }
}

export const fetchExhibit = (slug, preview) => {
  const url = helper.getContentfulQueryUrl(`content_type=exhibit&fields.slug=${slug}&include=2`, preview)

  return (dispatch) => {
    dispatch(requestExhibit(slug))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveExhibit(slug, json)))
      .catch(response => dispatch(receiveExhibit(slug, response)))
  }
}
