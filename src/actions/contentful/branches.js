import fetch from 'isomorphic-fetch'
import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_BRANCHES = 'CF_REQUEST_BRANCHES'
export const requestBranches = (depth) => {
  return {
    type: CF_REQUEST_BRANCHES,
    depth: depth,
  }
}

export const CF_RECEIVE_BRANCHES = 'CF_RECEIVE_BRANCHES'
const receiveError = (response, depth) => {
  return {
    type: CF_RECEIVE_BRANCHES,
    status: response ? statuses.fromHttpStatusCode(response.status) : statuses.NOT_FOUND,
    depth: depth,
    error: response,
    receivedAt: Date.now(),
  }
}
const receiveSuccess = (response, depth) => {
  return {
    type: CF_RECEIVE_BRANCHES,
    status: statuses.SUCCESS,
    depth: depth,
    branches: response,
    receivedAt: Date.now(),
  }
}

const receiveBranches = (response, depth) => {
  if (Array.isArray(response)) {
    return receiveSuccess(response, depth)
  }
  return receiveError(response, depth)
}

export const fetchBranches = (preview, include = 0) => {
  const endpoint = 'query'
  const query = encodeURIComponent(`content_type=page&fields.type=Branch&include=${include}&order=fields.title`)
  let url = `${Config.contentfulAPI}/${endpoint}?locale=en-US&query=${query}`
  if (preview) {
    url += `&preview=${preview}`
  }

  return (dispatch, getState) => {
    dispatch(requestBranches(include))

    const login = getState().personal.login
    const headers = (login && login.token) ? { Authorization: getState().personal.login.token } : {}

    return fetch(url, { headers })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          return response
        }
      })
      .then(json => dispatch(receiveBranches(json, include)))
      .catch(response => {
        dispatch(receiveError(response, include))
      })
  }
}
