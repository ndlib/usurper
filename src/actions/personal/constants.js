import fetch from 'isomorphic-fetch'
export const RECEIVE_PERSONAL = 'RECEIVE_PERSONAL'
export const CLEAR_PERSONAL = 'CLEAR_PERSONAL'
export const REQUEST_PERSONAL = 'REQUEST_PERSONAL'

export const recievePersonal = (requestType, state, info) => {
  return {
    type    : RECEIVE_PERSONAL,
    requestType: requestType,
    payload : info,
    state: state,
  }
}

export const clearPersonalInfo = () => {
  return {
    type    : CLEAR_PERSONAL,
  }
}

// keep track of what do and don't have an active request or for.
export const requestPersonal = (requestType = '') => {
  return {
    type: REQUEST_PERSONAL,
    requestType: requestType,
  }
}

export const startRequest = (url, dispatch, success, token, err) => {
  return fetch(url, {
    headers: {
      'Authorization': token,
    },
  }).then(response => {
    if (response.status >= 200 && response.status < 400) {
      return response.json()
    } else {
      throw new Error(response.statusText)
    }
  }).then(json => success(dispatch, json))
  .catch(e => {
    err(e)
  })
}
