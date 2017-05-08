import fetch from 'isomorphic-fetch'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    page
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
function receivePage (page, response) {
  let error = {
    type: CF_RECEIVE_PAGE,
    status: 'error',
    error: response,
    receivedAt: Date.now()
  }

  let success = {
    type: CF_RECEIVE_PAGE,
    status: 'success',
    page: response,
    receivedAt: Date.now()
  }

  try{
    if (response.sys.contentType.sys.id === 'page') {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export function fetchPage (page) {
  let url = `/${page}.json`
  return dispatch => {
    dispatch(requestPage(page))
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePage(page, json)))
      .catch(response => dispatch(receivePage(page, response)))
  }
}
