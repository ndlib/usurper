import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

export const handleUser = (dispatch, data) => {
  dispatch(
    states.recievePersonal(
      'user',
      statuses.SUCCESS,
      data.user,
    )
  )
}

export const handleResources = (type) => {
  return (dispatch, data) => {
    if (data.checkedOut) {
      dispatch(
        states.recievePersonal(
          type + 'Have',
          statuses.SUCCESS,
          {
            checkedOut: data.checkedOut,
            web: data.web,
          }
        )
      )
    } else {
      dispatch(
        states.recievePersonal(
          type + 'Pending',
          statuses.SUCCESS,
          {
            pending: data.pending,
          }
        )
      )
    }
  }
}

const doQuery = (dispatch, service, type, func, token, stateKey, retry = 0) => {
  dispatch(states.requestPersonal(stateKey))
  states.startRequest(
    Config.resourcesAPI + '/' + service + '?type=' + type,
    dispatch,
    func,
    token,
    (e) => {
      console.log(e)
      if (retry === 0) {
        console.log('Error, retrying ' + service + ' ' + type)
        doQuery(dispatch, service, type, func, token, stateKey, 1)
      } else {
        dispatch(states.recievePersonal(stateKey, statuses.ERROR, e.message))
      }
    }
  )
}

export const getUser = () => {
  return (dispatch, getState) => {
    var state = getState().personal
    doQuery(dispatch, 'aleph', 'user', handleUser, state.login.token, 'user')
  }
}

export const getPending = () => {
  let alephRetry = 0
  let illRetry = 0
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token
    doQuery(dispatch, 'aleph', 'pending', handleResources('aleph'), token, 'alephPending')
    doQuery(dispatch, 'illiad', 'pending', handleResources('ill'), token, 'illPending')
  }
}

export const getBorrowed = () => {
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token

    doQuery(dispatch, 'aleph', 'borrowed', handleResources('aleph'), token, 'alephHave')
    doQuery(dispatch, 'illiad', 'borrowed', handleResources('ill'), token, 'illHave')
  }
}

const getResources = () => {
  return (dispatch, getState) => {
    getUser()(dispatch, getState)
    getPending()(dispatch, getState)
    getBorrowed()(dispatch, getState)
  }
}

export default getResources
