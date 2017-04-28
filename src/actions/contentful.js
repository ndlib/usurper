import fetch from 'isomorphic-fetch'

export const CF_REQUEST_PAGE = 'CF_REQUEST_PAGE'
export const requestPage = (page) => {
  return {
    type: CF_REQUEST_PAGE,
    page
  }
}

export const CF_RECEIVE_PAGE = 'CF_RECEIVE_PAGE'
function receivePage (page, json) {
  return {
    type: CF_RECEIVE_PAGE,
    page: json,
    receivedAt: Date.now()
  }
}

export function fetchPage (page) {
  const cfAccessToken = ''
  const cfSpaceId = ''
  const cfHostPath = ''
  let cfSearchUrl = `${cfHostPath}/spaces/${cfSpaceId}/entries?`
  cfSearchUrl += `access_token=${cfAccessToken}`
  cfSearchUrl += `&fields.url=${page}`
  cfSearchUrl += `&content_type=page`
  return dispatch => {
    dispatch(requestPage(page))
    return fetch(cfSearchUrl)
      .then(response => response.json())
      .then(json => dispatch(receivePage(page, json.items[0])))
  }
}
