import Config from '../shared/Configuration'
import fetch from 'isomorphic-fetch'
import * as statuses from '../constants/APIStatuses'

export const REQUEST_LIBRARIANS = 'REQUEST_LIBRARIANS'
export const requestLibrarians = (netids) => {
  return {
    type: REQUEST_LIBRARIANS,
    netids,
  }
}

function genResponse (status, data) {
  return {
    type: RECEIVE_LIBRARIANS,
    status: status,
    data: data,
    receivedAt: Date.now(),
  }
}

export const RECEIVE_LIBRARIANS = 'RECEIVE_LIBRARIANS'
function receivePage (netids, response) {
  try {
    if (response.librarians) {
      return genResponse(statuses.SUCCESS, response)
    } else {
      return genResponse(statuses.ERROR, response)
    }
  } catch (e) {
    return genResponse(statuses.ERROR, response)
  }
}

export function fetchLibrarians (netids) {
  if (!netids || netids.length <= 0) {
    return dispatch => { dispatch(genResponse(statuses.NOT_FOUND, '')) }
  }

  let url = Config.recommendAPI + '/librarianInfo?netids=' + netids.join()

  return dispatch => {
    dispatch(requestLibrarians(netids))
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePage(netids, json)))
  }
}
