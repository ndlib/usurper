import OktaAuth from '@okta/okta-auth-js'
import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const handleToken = (dispatch, data) => {
  console.log('handleToken')
  console.log(data)
  if (data.redirect) {
    dispatch(
      states.receivePersonal(
        'login',
        statuses.SUCCESS,
        { redirectUrl: data.redirect }
      )
    )
  } else if (data.idToken) {
    dispatch(
      states.receivePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.idToken, redirectUrl: null }
      )
    )
  }
}

const getToken = () => {
  console.log('getToken')
  const authClient = new OktaAuth({
    url: Config.oktaUrl,
    clientId: Config.oktaClientId,
    redirectUri: `${window.location.origin}/`,
    issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
  })
  return dispatch => {
    console.log('dispatch')
    console.log('origin', window.location.origin)
    console.log('hash', window.location.hash)
    dispatch(states.requestPersonal('login', statuses.FETCHING))
    try {
      console.log('trying client')
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          console.log('tried to get token')
          if (idToken) {
            console.log('got idToken')
            console.log(idToken)
            handleToken(dispatch, idToken)
            // If ID Token isn't found, try to parse it from the current URL
          } else if (window.location.hash) {
            console.log('got hash')
            console.log('hash', window.location.hash)
            authClient.token.parseFromUrl()
              .then(idToken => {
                console.log('try parseFromUrl')
                console.log(idToken)
                // Store parsed token in Token Manager
                authClient.tokenManager.add('idToken', idToken)
                handleToken(dispatch, idToken)
              })
              .catch(error => console.error(error))
          } else {
            console.error('Could not get token from hash or storage')
          }
        })
    } catch {
      console.error('Could not access tokenManager.')
    }
  }
}

export default getToken

export const initLogin = () => {
  console.log('initLogin')
  const authClient = new OktaAuth({
    url: Config.oktaUrl,
    clientId: Config.oktaClientId,
    redirectUri: `${window.location.origin}/`,
    issuer: 'https://okta.nd.edu/oauth2/ausxosq06SDdaFNMB356',
  })
  authClient.token.getWithRedirect({
    responseType: 'id_token',
    scopes: [
      'openid',
      'profile',
      'email',
      'netid',
    ],
  })
}
