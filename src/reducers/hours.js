import { HOURS_REQUEST, HOURS_RECEIVE, HOURS_NO_SUCH } from '../actions/hours'
import * as statuses from '../constants/APIStatuses'

export default(state = { status: statuses.FETCHING, json: {} }, action) => {
  switch (action.type) {
    case HOURS_REQUEST:
      return Object.assign({}, state, {
        status: statuses.FETCHING
      })
    case HOURS_RECEIVE:
      return Object.assign({}, state, {
        status: action.status,
        json: action.hours
      })
    case HOURS_NO_SUCH:
      return Object.assign({}, state, {
        status: action.status
      })
    default:
      return state
  }
}
