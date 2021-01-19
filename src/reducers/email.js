import {
  REQUEST_EMAIL_SUBSCRIPTION,
  RECEIVE_EMAIL_SUBSCRIPTION,
  REQUEST_EMAIL_SUBSCRIPTION_UPDATE,
  RECEIVE_EMAIL_SUBSCRIPTION_UPDATE,
} from 'actions/email'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case REQUEST_EMAIL_SUBSCRIPTION:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        subscriptionType: action.subscriptionType,
        emailAddress: action.emailAddress,
      })
    case RECEIVE_EMAIL_SUBSCRIPTION:
      return Object.assign({}, state, {
        status: action.status,
        subscriptionType: action.subscriptionType,
        emailAddress: action.emailAddress,
        // Include all fields from data except emailAddress and itemKey because they are redundant
        ...{
          ...action.data,
          emailAddress: undefined,
          itemKey: undefined,
        },
      })
    case REQUEST_EMAIL_SUBSCRIPTION_UPDATE:
      return Object.assign({}, state, {
        update: {
          status: statuses.FETCHING,
        },
      })
    case RECEIVE_EMAIL_SUBSCRIPTION_UPDATE:
      // If the update didn't succeed, don't update the other info, just the update status
      if (action.status !== statuses.SUCCESS) {
        return Object.assign({}, state, {
          update: {
            status: action.status,
          },
        })
      }

      return Object.assign({}, state, {
        subscriptionType: action.subscriptionType,
        emailAddress: action.emailAddress,
        // Include all fields from data except emailAddress and itemKey because they are redundant
        ...{
          ...action.data,
          emailAddress: undefined,
          itemKey: undefined,
        },
        update: {
          status: action.status,
        },
      })
    default:
      return state
  }
}
