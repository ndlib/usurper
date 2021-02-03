import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'

export const REQUEST_EMAIL_SUBSCRIPTION = 'REQUEST_EMAIL_SUBSCRIPTION'
export const RECEIVE_EMAIL_SUBSCRIPTION = 'RECEIVE_EMAIL_SUBSCRIPTION'
export const REQUEST_EMAIL_SUBSCRIPTION_UPDATE = 'REQUEST_EMAIL_SUBSCRIPTION_UPDATE'
export const RECEIVE_EMAIL_SUBSCRIPTION_UPDATE = 'RECEIVE_EMAIL_SUBSCRIPTION_UPDATE'

const requestSubscription = (type, email) => {
  return {
    type: REQUEST_EMAIL_SUBSCRIPTION,
    subscriptionType: type,
    emailAddress: email,
  }
}

const requestUpdateSubscription = () => {
  return {
    type: REQUEST_EMAIL_SUBSCRIPTION_UPDATE,
  }
}

export const receiveSubscription = (type, email, response) => {
  const error = {
    type: RECEIVE_EMAIL_SUBSCRIPTION,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    subscriptionType: type,
    emailAddress: email,
    error: response,
  }

  const success = {
    type: RECEIVE_EMAIL_SUBSCRIPTION,
    status: statuses.SUCCESS,
    subscriptionType: type,
    emailAddress: email,
    data: response,
  }

  return response.errorStatus ? error : success
}

export const receiveUpdateSubscription = (type, email, response) => {
  const error = {
    type: RECEIVE_EMAIL_SUBSCRIPTION_UPDATE,
    status: statuses.fromHttpStatusCode(response.errorStatus),
    error: response,
  }

  const success = {
    type: RECEIVE_EMAIL_SUBSCRIPTION_UPDATE,
    status: statuses.SUCCESS,
    subscriptionType: type,
    emailAddress: email,
    data: response,
  }

  return response.errorStatus ? error : success
}

export const fetchSubscription = (type, email) => {
  const url = `${Config.userPrefsAPI}/emailSubscription/${type}?emailAddress=${email}`

  return (dispatch) => {
    dispatch(requestSubscription(type, email))

    return fetch(url)
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveSubscription(type, email, json)))
      .catch(e => dispatch(receiveSubscription(type, email, e)))
  }
}

export const putSubscription = (type, email, body) => {
  const url = `${Config.userPrefsAPI}/emailSubscription/${type}`

  return (dispatch) => {
    dispatch(requestUpdateSubscription())

    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        ...body,
        emailAddress: email,
      }),
    })
      .then(response => response.ok ? response.json() : { errorStatus: response.status })
      .then(json => dispatch(receiveUpdateSubscription(type, email, json)))
      .catch(e => dispatch(receiveUpdateSubscription(type, email, e)))
  }
}
