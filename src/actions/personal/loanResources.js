import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const resourcesUrl = Config.resourcesAPI
const userPrefsUrl = Config.userPrefsAPI

export const handleUser = (dispatch, data) => {
  dispatch(
    states.receivePersonal(
      'user',
      statuses.SUCCESS,
      data,
    )
  )
}

export const handleResources = (service, type, library = '') => {
  return (dispatch, data) => {
    if (type === 'circHistory') {
      dispatch(states.receivePersonal('historical', statuses.SUCCESS, {
        history: data,
      }))
    } else {
      const libraryProper = library ? (library.charAt(0).toUpperCase() + library.slice(1).toLowerCase()) : ''
      const from = (service === 'ill') ? 'ILL' : libraryProper.toUpperCase()

      for (let i = 0; i < data.length; i++) {
        data[i].from = from
        data[i].id = data[i].id || data[i].loanNumber || data[i].transactionNumber
        if (from !== 'ILL') {
          data[i].documentType = data[i].material
        }
      }

      if (type === 'borrowed') {
        dispatch(states.receivePersonal(service + 'Have' + libraryProper, statuses.SUCCESS, { items: data }))
      } else {
        dispatch(states.receivePersonal(service + 'Pending' + libraryProper, statuses.SUCCESS, { items: data }))
      }
    }
  }
}

const doQuery = (dispatch, service, type, func, token, stateKey, retry = 0, library = null) => {
  let path = (service === 'userPrefs') ? `${userPrefsUrl}/${type}` : `${resourcesUrl}/${service}/${type}`
  if (library) {
    path += `?library=${library}`
  }
  dispatch(states.requestPersonal(stateKey))
  states.startRequest(
    path,
    'GET',
    dispatch,
    func,
    token,
    (e) => {
      console.error(e)
      if (retry === 0) {
        console.log('Retrying ' + service + ' ' + type)
        doQuery(dispatch, service, type, func, token, stateKey, 1, library)
      } else {
        dispatch(states.receivePersonal(stateKey, statuses.ERROR, e.message))
      }
    }
  )
}

export const getUser = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    doQuery(dispatch, 'aleph', 'user', handleUser, state.login.token, 'user')
  }
}

export const getPending = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    const token = state.login.token
    doQuery(dispatch, 'aleph', 'pending',
      handleResources('aleph', 'pending', 'Ndu'),
      token, 'alephPendingNdu', 0, 'ndu50')
    doQuery(dispatch, 'aleph', 'pending',
      handleResources('aleph', 'pending', 'Hcc'),
      token, 'alephPendingHcc', 0, 'hcc50')
    doQuery(dispatch, 'illiad', 'pending',
      handleResources('ill', 'pending'),
      token, 'illPending')
  }
}

export const getBorrowed = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    const token = state.login.token

    doQuery(dispatch, 'aleph', 'borrowed',
      handleResources('aleph', 'borrowed', 'Ndu'),
      token, 'alephHaveNdu', 0, 'ndu50')
    doQuery(dispatch, 'aleph', 'borrowed',
      handleResources('aleph', 'borrowed', 'Hcc'),
      token, 'alephHaveHcc', 0, 'hcc50')
    doQuery(dispatch, 'illiad', 'borrowed',
      handleResources('ill', 'borrowed'),
      token, 'illHave')
  }
}

export const getHistorical = () => {
  return (dispatch, getState) => {
    const state = getState().personal
    const token = state.login.token
    doQuery(dispatch, 'userPrefs', 'circHistory', handleResources('userPrefs', 'circHistory'), token, 'historical')
  }
}
const getResources = () => {
  return (dispatch, getState) => {
    getPending()(dispatch, getState)
    getBorrowed()(dispatch, getState)
  }
}

export const deleteHistorical = (recordKey = null, successCallback = null, errorCallback = null) => {
  return (dispatch, getState) => {
    const state = getState().personal
    const token = state.login.token
    let path = userPrefsUrl + '/circHistory'
    if (recordKey) {
      path += '/' + recordKey
    }
    const requestKey = 'deleteHistorical'

    dispatch(states.requestPersonal(requestKey))
    states.startRequest(path, 'DELETE', dispatch,
      (dsp, data) => {
        dispatch(states.receivePersonal(requestKey, statuses.SUCCESS))
        // If a specific record was deleted, remove it from the history list
        if (recordKey) {
          data = { ...data, ...state.historical }
          if (data.deleted) {
            delete data.history[recordKey]
          } else {
            console.warn(`Delete not allowed/unsuccessful for ${recordKey}.`)
          }
        }
        // Update the state with the new list
        // Response of delete all should return new list of history that we don't need to alter
        dispatch(states.receivePersonal('historical', statuses.SUCCESS, data))

        if (typeof successCallback === 'function') {
          successCallback(data)
        }
      },
      token,
      (e) => {
        console.error(e)
        dispatch(states.receivePersonal(requestKey, statuses.ERROR, e.message))
        if (typeof errorCallback === 'function') {
          errorCallback(e)
        }
      }
    )
  }
}

export default getResources
