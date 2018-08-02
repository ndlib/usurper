import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'
export const REQUEST_SETTINGS = 'REQUEST_SETTINGS'

export const KIND = {
  homeLibrary: 'HOME_LIBRARY',
  circStatus: 'CIRC_STATUS',
}

const requestSettings = (kind, data) => {
  return {
    type: REQUEST_SETTINGS,
    kind: kind,
    data: data,
  }
}

const recieveSettings = (kind, data, state, json) => {
  return {
    type: RECEIVE_SETTINGS,
    data: data,
    kind: kind,
    state: state,
    json: json,
  }
}

export const setHomeLibrary = (library) => {
  return (dispatch, getState) => {
    var state = getState().personal

    dispatch(requestSettings(KIND.homeLibrary, library))
    let url = Config.resourcesAPI + '/aleph/update'
    return fetch(url, {
      method: 'post',
      headers: {

        'Authorization': state.login.token,
      },
      body: {
        'library': library,
        'aleph-id': state.user.alephId,
      },
    })
      .then(response => { return response.json() })
      .then(json => dispatch(
        recieveSettings(KIND.homeLibrary, library, statuses.SUCCESS, json)
      ))
      .catch((e) => {
        console.log(e)
        dispatch(recieveSettings(KIND.homeLibrary, library, statuses.ERROR, e))
      })
  }
}
export const getCircStatus = () => {
  return (dispatch, getState) => {
    let state = getState().personal
    dispatch(requestSettings(KIND.circStatus, null))
    let url = Config.userPrefsAPI + 'circHistory'
    // REMOVE TOKEN DEBUG
    // console.log('token', state.login)
    return fetch(url, {
      method: 'get',
      headers: {
        'Authorization': state.login.token,
      },
    })
      .then(response => {
        const jsonResponse = response.json()
        return jsonResponse
      })
      .then(json => dispatch(
        recieveSettings(KIND.circStatus, null, statuses.SUCCESS, json)
      ))
      .catch((e) => {
        console.log(e)
        dispatch(recieveSettings(KIND.circStatus, null, statuses.ERROR, e))
      })
  }
}

export const setCircStatus = (checked) => {
  return (dispatch, getState) => {
    let state = getState().personal
    dispatch(requestSettings(KIND.circStatus, checked))
    let url = Config.userPrefsAPI + 'circHistory'
    return fetch(url, {
      method: 'post',
      headers: {
        'Authorization': state.login.token,
      },
      body: JSON.stringify({ 'saveHistory': checked }),
    })
      .then(response => {
        const jsonResponse = response.json()
        return jsonResponse
      })
      .then(json => dispatch(
        recieveSettings(KIND.circStatus, checked, statuses.SUCCESS, json)
      ))
      .catch((e) => {
        console.log(e)
        dispatch(recieveSettings(KIND.circStatus, checked, statuses.ERROR, e))
      })
  }
}
