import { CF_REQUEST_ALLALERTS, CF_RECEIVE_ALLALERTS } from '../../actions/contentful/allAlerts'
import * as statuses from '../../constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLALERTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLALERTS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.allAlerts,
      })
    default:
      return state
  }
}
