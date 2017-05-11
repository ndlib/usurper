import Config from '../../shared/Configuration'
import * as states from './constants'
import * as statuses from '../../constants/APIStatuses'

// ------------------------------------
// Constants
// ------------------------------------
const loginUrl = Config.viceroyAPI + '/token'
const logoutUrl = Config.viceroyAPI + '/logout'

function handleToken (dispatch, data) {
  if (data.redirect) {
    dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { buttonUrl: data.redirect }
      )
    )
  } else if (data.jwt) {
    dispatch(
      states.recievePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.jwt, buttonUrl: '/personal', logoutUrl: logoutUrl }
      )
    )
  }
}

export default function getToken () {
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
      console.log(e)
      dispatch(states.recievePersonal('login', statuses.ERROR))
    })
  }
}
