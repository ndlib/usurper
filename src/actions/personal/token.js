import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'
import fetch from 'isomorphic-fetch'

// ------------------------------------
// Constants
// ------------------------------------
const loginUrl = Config.viceroyAPI + '/token'

const handleToken = (dispatch, data) => {
  if (data.redirect) {
    dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { redirectUrl: data.redirect }
      )
    )
  } else if (data.jwt) {
    dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.jwt, redirectUrl: null }
      )
    )
  }
}

const getToken = () => {
  return dispatch => {
    dispatch(states.requestPersonal('login', statuses.FETCHING))

    return fetch(loginUrl, {
      credentials: 'include',
    }).then(response => {
      if (response.status >= 200 && response.status < 400) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(json => handleToken(dispatch, json))
    .catch(e => {
      dispatch(states.recievePersonal('login', statuses.ERROR, e.message))
    })
  }
}

export default getToken
