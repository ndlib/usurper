import Config from 'shared/Configuration'
import fetch from 'isomorphic-fetch'
import * as statuses from 'constants/APIStatuses'

export const REQUEST_CONTACTS = 'REQUEST_CONTACTS'
export const RECEIVE_CONTACTS = 'RECEIVE_CONTACTS'

export const requestContacts = (netids) => {
  return {
    type: REQUEST_CONTACTS,
    netids: netids,
  }
}

const genResponse = (status, data, netids) => {
  return {
    type: RECEIVE_CONTACTS,
    status: status,
    netids: netids,
    data: data,
    receivedAt: Date.now(),
  }
}

const receivePage = (netids, response) => {
  try {
    if (response.librarians) {
      return genResponse(statuses.SUCCESS, response, netids)
    } else {
      return genResponse(statuses.ERROR, response, netids)
    }
  } catch (e) {
    return genResponse(statuses.ERROR, response, netids)
  }
}

export const fetchContacts = (netids) => {
  if (!netids || netids.length <= 0) {
    return dispatch => {
      dispatch(genResponse(statuses.NOT_FOUND, ''))
    }
  }

  const url = Config.recommendAPI + '/librarianInfo?netids=' + netids
  return dispatch => {
    dispatch(requestContacts(netids))
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receivePage(netids, json)))
      .catch(e => dispatch(receivePage(netids, e)))
  }
}
