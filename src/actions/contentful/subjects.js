import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_SUBJECTS = 'CF_REQUEST_SUBJECTS'
export const requestSubjects = (depth) => {
  return {
    type: CF_REQUEST_SUBJECTS,
    depth: depth,
  }
}

export const CF_RECEIVE_SUBJECTS = 'CF_RECEIVE_SUBJECTS'
const receiveError = (response, depth) => {
  return {
    type: CF_RECEIVE_SUBJECTS,
    status: (response && response.status) ? statuses.fromHttpStatusCode(response.status) : statuses.NOT_FOUND,
    depth: depth,
    error: response,
    receivedAt: Date.now(),
  }
}
const receiveSuccess = (response, depth) => {
  return {
    type: CF_RECEIVE_SUBJECTS,
    status: statuses.SUCCESS,
    depth: depth,
    data: response[0],
    receivedAt: Date.now(),
  }
}

const receiveSubjects = (response, depth) => {
  if (response.length > 0 && typy(response[0], 'sys.contentType.sys.id').safeString === 'grouping') {
    return receiveSuccess(response, depth)
  }
  return receiveError(response, depth)
}

export const fetchSubjects = (preview, include = 2) => {
  const url = helper.getContentfulQueryUrl(`content_type=grouping&fields.id=resource-facet-subject&include=${include}`, preview)

  return (dispatch) => {
    dispatch(requestSubjects(include))

    return fetch(url)
      .then(response => {
        if (statuses.fromHttpStatusCode(response.status) === statuses.SUCCESS || response.ok) {
          return response.json()
        } else {
          return response
        }
      })
      .then(json => dispatch(receiveSubjects(json, include)))
      .catch(response => {
        dispatch(receiveError(response, include))
      })
  }
}
