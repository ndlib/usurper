import fetch from 'isomorphic-fetch'
import Config from '../../shared/Configuration'
import * as statuses from '../../constants/APIStatuses'

export const CF_REQUEST_ALLNEWS = 'CF_REQUEST_ALLNEWS'
export const requestAllNews = () => {
  return {
    type: CF_REQUEST_ALLNEWS,
  }
}

export const CF_RECEIVE_ALLNEWS = 'CF_RECEIVE_ALLNEWS'
const receiveAllNews = (response) => {
  let error = {
    type: CF_RECEIVE_ALLNEWS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  let success = {
    type: CF_RECEIVE_ALLNEWS,
    status: statuses.SUCCESS,
    allNews: response,
    receivedAt: Date.now(),
  }

  try {
    if (response[0] && response[0].sys.id) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchAllNews = (preview) => {
  const query = encodeURIComponent('content_type=news&include=5')
  let url = `${Config.contentfulAPI}query?locale=en-US&query=${query}`
  if (preview) { url += `&preview=${preview}` }

  return dispatch => {
    dispatch(requestAllNews())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllNews(json)))
      .catch(response => dispatch(receiveAllNews(response)))
  }
}
