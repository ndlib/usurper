import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_GROUPING = 'CF_REQUEST_GROUPING'
export const requestGrouping = (id) => {
  return {
    type: CF_REQUEST_GROUPING,
    id,
  }
}

export const CF_RECEIVE_GROUPING = 'CF_RECEIVE_GROUPING'
const receiveGrouping = (id, response) => {
  const error = {
    type: CF_RECEIVE_GROUPING,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    id,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_GROUPING,
    status: statuses.SUCCESS,
    id,
    grouping: response[0],
    receivedAt: Date.now(),
  }

  if (typy(response[0], 'sys.contentType.sys.id').safeString === 'grouping') {
    return success
  } else {
    return error
  }
}

export const fetchGrouping = (id, preview, depth = 2) => {
  const url = helper.getContentfulQueryUrl(`content_type=grouping&fields.id=${id}&include=${depth}`, preview)

  return (dispatch) => {
    dispatch(requestGrouping(id))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveGrouping(id, json)))
      .catch(response => dispatch(receiveGrouping(id, response)))
  }
}
