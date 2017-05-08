import { HOURS_REQUEST, HOURS_RECEIVE, HOURS_NO_SUCH } from '../actions/hours'

export default(state = { status: "fetching" }, action) => {
  switch (action.type) {
    case HOURS_REQUEST:
      return Object.assign({}, state, {
        status: "fetching"
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
