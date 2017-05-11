import { HOURS_REQUEST, HOURS_RECEIVE, HOURS_NO_SUCH } from '../actions/hours'
import * as statuses from '../constants/APIStatuses'

export default(state = { status: statuses.FETCHING }, action) => {
  switch (action.type) {
    case HOURS_REQUEST:
      console.log("reducer")
      console.log(action.type)
      return Object.assign({}, state, {
        status: statuses.FETCHING
      })
    case HOURS_RECEIVE:
      console.log("reducer")
      console.log(action.type)
      return Object.assign({}, state, {
        status: action.status,
        json: action.hours
      })
    case HOURS_NO_SUCH:
      console.log("reducer")
      console.log(action.type)
      return Object.assign({}, state, {
        status: action.status
      })
    default:
      return state
  }
}
