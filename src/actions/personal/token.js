import OktaAuth from '@okta/okta-auth-js'
import Config from 'shared/Configuration'
import * as states from './constants'
import * as statuses from 'constants/APIStatuses'

const oktaConfig = {
  url: Config.oktaUrl,
  clientId: Config.oktaClientId,
  redirectUri: `${window.location.origin}/`,
  issuer: Config.oktaIssuer,
  ignoreSignature: true,
  tokenManager: {
    storage: 'sessionStorage',
    storageKey: 'libraryWebsite',
  },
}

export const initLogin = () => {
  return () => {
    // Save the user's requested url to local storage so we can redirect them after authenticating
    try {
      window.localStorage.setItem('redirectUrl', window.location.href)
    } catch (e) {
      console.warn('Local storage is not available.')
    }

    const authClient = new OktaAuth(oktaConfig)
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
}

const handleToken = (dispatch, data) => {
  if (data.idToken) {
    try {
      const redirectUrl = window.localStorage.getItem('redirectUrl')
      if (redirectUrl) {
        // Remove it so that subsequent requests for the token do not cause redirects
        window.localStorage.removeItem('redirectUrl')

        // Now redirect the browser
        window.location.assign(redirectUrl)
        return
      }
    } catch (e) {
      console.warn('Local storage is not available.')
    }

    dispatch(
      states.receivePersonal(
        'login',
        statuses.SUCCESS,
        { token: data.idToken }
      )
    )
  } else {
    dispatch(
      states.receivePersonal(
        'login',
        statuses.UNAUTHENTICATED,
        { token: null }
      )
    )
  }
}

const getToken = () => {
  const authClient = new OktaAuth(oktaConfig)
  return dispatch => {
    dispatch(states.requestPersonal('login', statuses.FETCHING))
    try {
      authClient.tokenManager.get('idToken')
        .then(idToken => {
          if (idToken) {
            handleToken(dispatch, idToken)
            // If ID Token isn't found, try to parse it from the current URL
          } else if (window.location.hash) {
            authClient.token.parseFromUrl()
              .then(idToken => {
                // Store parsed token in Token Manager
                authClient.tokenManager.add('idToken', idToken)
                handleToken(dispatch, idToken)
              })
              .catch(error => console.error(error))
          } else {
            dispatch(
              states.receivePersonal(
                'login',
                statuses.UNAUTHENTICATED,
              )
            )
          }
        })
    } catch {
      console.error('Could not access tokenManager.')
    }
  }
}

export default getToken
