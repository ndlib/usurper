import fetch from 'isomorphic-fetch'
import * as helper from 'constants/HelperFunctions'
import * as statuses from 'constants/APIStatuses'

export const CF_REQUEST_ALLNEWS = 'CF_REQUEST_ALLNEWS'
export const requestAllNews = () => {
  return {
    type: CF_REQUEST_ALLNEWS,
  }
}

export const CF_RECEIVE_ALLNEWS = 'CF_RECEIVE_ALLNEWS'
const receiveAllNews = (response) => {
  const error = {
    type: CF_RECEIVE_ALLNEWS,
    status: response.status === 404 ? statuses.NOT_FOUND : statuses.ERROR,
    error: response,
    receivedAt: Date.now(),
  }

  const success = {
    type: CF_RECEIVE_ALLNEWS,
    status: statuses.SUCCESS,
    allNews: response,
    receivedAt: Date.now(),
  }

  try {
    if (Array.isArray(response)) {
      return success
    } else {
      return error
    }
  } catch (e) {
    return error
  }
}

export const fetchAllNews = (preview) => {
  const url = helper.getContentfulQueryUrl('content_type=news&include=1', preview)

  return dispatch => {
    dispatch(requestAllNews())
    return fetch(url)
      .then(response => response.ok ? response.json() : { status: response.status })
      .then(json => dispatch(receiveAllNews(json)))
      .catch(response => dispatch(receiveAllNews(response)))
  }
}
