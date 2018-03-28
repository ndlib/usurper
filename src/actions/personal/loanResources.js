import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

export const handleUser = (dispatch, data) => {
  dispatch(
    states.recievePersonal(
      'user',
      statuses.SUCCESS,
      { user: data },
    )
  )
}

export const handleResources = (service, type) => {
  return (dispatch, data) => {
    if (type === 'borrowed') {
      dispatch(
        states.recievePersonal(
          service + 'Have',
          statuses.SUCCESS,
          { checkedOut: data }
        )
      )
    } else {
      dispatch(
        states.recievePersonal(
          service + 'Pending',
          statuses.SUCCESS,
          { pending: data }
        )
      )
    }
  }
}

const doQuery = (dispatch, service, type, func, token, stateKey, retry = 0) => {
  dispatch(states.requestPersonal(stateKey))
  states.startRequest(
    Config.resourcesAPI + '/' + service + '/' + type,
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
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token
    doQuery(dispatch, 'aleph', 'pending', handleResources('aleph', 'pending'), token, 'alephPending')
    doQuery(dispatch, 'illiad', 'pending', handleResources('ill', 'pending'), token, 'illPending')
  }
}

export const getBorrowed = () => {
  return (dispatch, getState) => {
    let state = getState().personal
    let token = state.login.token

    doQuery(dispatch, 'aleph', 'borrowed', handleResources('aleph', 'borrowed'), token, 'alephHave')
    doQuery(dispatch, 'illiad', 'borrowed', handleResources('ill', 'borrowed'), token, 'illHave')
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
