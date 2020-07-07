import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

export const RECEIVE_SETTINGS = 'RECEIVE_SETTINGS'
export const REQUEST_SETTINGS = 'REQUEST_SETTINGS'
export const RECEIVE_UPDATE_SETTINGS = 'RECEIVE_UPDATE_SETTINGS'
export const REQUEST_UPDATE_SETTINGS = 'REQUEST_UPDATE_SETTINGS'

export const KIND = {
  homeLibrary: 'homeLibrary',
  circStatus: 'circStatus',
  hideHomeFavorites: 'hideHomeFavorites',
  defaultSearch: 'defaultSearch',
  hiddenAlerts: 'hiddenAlerts',
}
export const DEFAULT_LIBRARY = 'hesburgh'

const requestSettings = (kind, data) => {
  return {
    type: REQUEST_SETTINGS,
    kind: kind,
    data: data,
  }
}

const receiveSettings = (kind, data, state, error) => {
  return {
    type: RECEIVE_SETTINGS,
    kind: kind,
    data: data,
    state: state,
    error: error,
  }
}

const requestUpdateSettings = (kind) => {
  return {
    type: REQUEST_UPDATE_SETTINGS,
    kind: kind,
  }
}

const receiveUpdateSettings = (kind, state, error) => {
  return {
    type: RECEIVE_UPDATE_SETTINGS,
    kind: kind,
    state: state,
    error: error,
  }
}

export const setCircStatus = (enabled) => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(requestUpdateSettings(KIND.circStatus))
    const url = Config.userPrefsAPI + '/circOptIn'
    return fetch(url, {
      method: 'post',
      headers: {
        'Authorization': state.login.token,
      },
      body: enabled,
    })
      .then(response => {
        if (response.ok) {
          const settingData = {
            saveHistory: enabled,
            status: response.status === 202 ? 'inprogress' : 'complete',
          }
          dispatch(receiveSettings(KIND.circStatus, settingData, statuses.SUCCESS))
          dispatch(receiveUpdateSettings(KIND.circStatus, statuses.SUCCESS))
          // If opted out, dispatch action to reset checkout history in store
          if (!enabled) {
            dispatch(states.receivePersonal('historical', statuses.NOT_FETCHED, {
              history: {},
            }))
          }
        } else {
          dispatch(receiveUpdateSettings(KIND.circStatus, statuses.ERROR))
        }
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveUpdateSettings(KIND.circStatus, statuses.ERROR, e))
      })
  }
}

const getSimpleSetting = (kind, defaultValue) => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(requestSettings(kind, null))
    const url = Config.userPrefsAPI + '/simpleSetting/' + kind
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': state.login.token,
      },
    })
      .then(response => {
        const jsonResponse = response.json()
        return jsonResponse
      })
      .then((json) => {
        const receivedValue = Array.isArray(json)
          ? json
          : (typeof json !== 'object' && json.toString()) ? json.toString() : defaultValue
        // If value is a string that looks like a boolean, convert it to an actual boolean
        const setValue = (receivedValue === 'false' || receivedValue === 'true')
          ? (receivedValue === 'true')
          : receivedValue
        dispatch(receiveSettings(kind, setValue, statuses.SUCCESS))
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveSettings(kind, defaultValue, statuses.ERROR, e))
        dispatch(receiveUpdateSettings(kind, statuses.ERROR, e))
      })
  }
}

const setSimpleSetting = (kind, value) => {
  return (dispatch, getState) => {
    const state = getState().personal
    dispatch(requestUpdateSettings(kind))
    const url = Config.userPrefsAPI + '/simpleSetting/' + kind
    return fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': state.login.token,
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.ok) {
          dispatch(receiveSettings(kind, value, statuses.SUCCESS))
          dispatch(receiveUpdateSettings(kind, statuses.SUCCESS))
        } else {
          dispatch(receiveUpdateSettings(kind, statuses.ERROR, response.json()))
        }
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveUpdateSettings(kind, statuses.ERROR, e))
      })
  }
}

export const clearUpdateSettings = (kind) => {
  return (dispatch) => {
    dispatch(receiveUpdateSettings(kind, statuses.NOT_FETCHED))
  }
}

export const getCircStatus = () => {
  return (dispatch, getState) => {
    const defaultValue = { saveHistory: false }
    const state = getState().personal
    dispatch(requestSettings(KIND.circStatus, null))
    const url = Config.userPrefsAPI + '/circOptIn'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': state.login.token,
      },
    })
      .then(response => response.status === 404 ? defaultValue : response.json())
      .then((data) => {
        dispatch(receiveSettings(KIND.circStatus, data, statuses.SUCCESS))
      })
      .catch((e) => {
        console.error(e)
        dispatch(receiveSettings(KIND.circStatus, defaultValue, statuses.ERROR, e))
        dispatch(receiveUpdateSettings(KIND.circStatus, statuses.ERROR, e))
      })
  }
}

export const getHomeLibrary = (isHomePage) => {
  return getSimpleSetting(KIND.homeLibrary, isHomePage ? 'ask-a-librarian-live-chat' : DEFAULT_LIBRARY)
}

export const setHomeLibrary = (librarySlug) => {
  return setSimpleSetting(KIND.homeLibrary, librarySlug)
}

export const getHideHomeFavorites = () => {
  return getSimpleSetting(KIND.hideHomeFavorites, false)
}

export const setHideHomeFavorites = (enabled) => {
  return setSimpleSetting(KIND.hideHomeFavorites, enabled)
}

export const getDefaultSearch = () => {
  return getSimpleSetting(KIND.defaultSearch, null)
}

export const setDefaultSearch = (value) => {
  return setSimpleSetting(KIND.defaultSearch, value)
}

export const getHiddenAlerts = () => {
  return getSimpleSetting(KIND.hiddenAlerts, [])
}

export const setHiddenAlerts = (hiddenIds) => {
  return setSimpleSetting(KIND.hiddenAlerts, hiddenIds)
}
