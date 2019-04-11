import fetch from 'isomorphic-fetch'
import * as statuses from '../constants/APIStatuses'
import Config from '../shared/Configuration'

export const FLOOR_SEARCH_REQUEST = 'FLOOR_SEARCH_REQUEST'
export const FLOOR_SEARCH_RECEIVE = 'FLOOR_SEARCH_RECEIVE'

export const requestFloorSearch = () => {
  return {
    type: FLOOR_SEARCH_REQUEST,
  }
}

const receiveFloorSearch = (response) => {
  if (response.stack === 'TypeError: Failed to fetch') {
    return {
      type: FLOOR_SEARCH_RECEIVE,
      status: statuses.ERROR,
      error: response,
      slug: '',
      receivedAt: Date.now(),
    }
  } else {
    return {
      type: FLOOR_SEARCH_RECEIVE,
      status: statuses.SUCCESS,
      slug: response.slug,
      receivedAt: Date.now(),
    }
  }
}

const searchFloorMaps = (searchQuery) => {
  return dispatch => {
    dispatch(requestFloorSearch())
    const url = Config.mapsAPI + '/map' + searchQuery
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveFloorSearch(json)))
      .catch(error => dispatch(receiveFloorSearch(error)))
  }
}

export default searchFloorMaps
