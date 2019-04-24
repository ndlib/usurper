import { CF_REQUEST_EVENT, CF_RECEIVE_EVENT } from 'actions/contentful/event'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_EVENT:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_EVENT:
      return Object.assign({}, state, {
        status: action.status,
        json: action.event,
      })
    default:
      return state
  }
}
