import fetch from 'isomorphic-fetch'
import Config from 'shared/Configuration'
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
    items: response,
    receivedAt: Date.now(),
  }
}

const receiveSubjects = (response, depth) => {
  if (Array.isArray(response)) {
    return receiveSuccess(response, depth)
  }
  return receiveError(response, depth)
}

export const fetchSubjects = (preview, include = 1) => {
  const query = encodeURIComponent(`content_type=internalLink&fields.context=Subject&include=${include}`)
  let url = `${Config.contentfulAPI}/${preview ? 'livequery' : 'query'}?locale=en-US&query=${query}`
  if (preview) {
    url += `&preview=${preview}`
  }

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
