// import fetch from 'isomorphic-fetch'
import data from '../../tmp_data/data'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    page
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
export const CF_NO_SUCH_PAGE = 'CF_NO_SUCH_PAGE'
function receivePage (page, response) {
  if (response === 'Error') {
    return {
      type: CF_RECEIVE_PAGE,
      status: 'error',
      error: response,
      receivedAt: Date.now()
    }
  } else if (response) {
    return {
      type: CF_RECEIVE_PAGE,
      status: 'success',
      page: response,
      receivedAt: Date.now()
    }
  } else {
    return {
      type: CF_NO_SUCH_PAGE,
      status: 'not found',
      receivedAt: Date.now()
    }
  }
}

export function fetchPage (page) {
  let ret = 'Error'
  for (var i in data) {
    if (data[i].fields.slug === page) {
      ret = data[i]
      break
    }
  }

  return dispatch => {
    dispatch(requestPage(page))
    dispatch(receivePage(page, ret))
  }
}
