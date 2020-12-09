import Config from 'shared/Configuration'
import fetch from 'isomorphic-fetch'
import typy from 'typy'
import * as statuses from 'constants/APIStatuses'

export const REQUEST_LIBRARIANS = 'REQUEST_LIBRARIANS'
export const RECEIVE_LIBRARIANS = 'RECEIVE_LIBRARIANS'

export const requestLibrarians = (netids) => {
  return {
    type: REQUEST_LIBRARIANS,
    netids: netids,
  }
}

const genResponse = (status, data, netids) => {
  return {
    type: RECEIVE_LIBRARIANS,
    status: status,
    netids: netids,
    data: data,
    receivedAt: Date.now(),
  }
}

const receiveLibrarians = (netids, responses) => {
  if (!Array.isArray(responses)) {
    return genResponse(statuses.ERROR, responses, netids)
  }

  let results = []
  let error = false
  responses.forEach(response => {
    // Successful API call will return an array
    if (Array.isArray(response.data)) {
      results = results.concat(response.data)
    } else if (typy(response, 'data.return_code').safeNumber !== 404) {
      // API returned an error.
      error = true
    }
    // NOTE: 404 results are intentionally ignored. They will just be omitted from the results,
    // but won't throw any errors or notices.
  })
  if (error) {
    return genResponse(statuses.ERROR, responses, netids)
  } else {
    return genResponse(results.length > 0 ? statuses.SUCCESS : statuses.NOT_FOUND, results, netids)
  }
}

export const fetchLibrarians = (netids) => {
  if (!netids || netids.length <= 0) {
    return dispatch => {
      dispatch(genResponse(statuses.NOT_FOUND, ''))
    }
  }

  return dispatch => {
    const idArray = Array.isArray(netids) ? netids : netids.split(',')
    dispatch(requestLibrarians(idArray))
    const promises = idArray.map(netid => {
      const url = `${Config.directoryAPI}/employee/json/by_netid/${netid}`
      return fetch(url).then(response => response.json()).then(result => ({
        netid: netid,
        data: result,
      }))
    })
    return Promise.all(promises)
      .then(results => dispatch(receiveLibrarians(idArray, results)))
      .catch(e => dispatch(receiveLibrarians(idArray, e)))
  }
}
