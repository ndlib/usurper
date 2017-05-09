import * as statuses from '../constants/APIStatuses'
import { REQUEST_LIBRARIANS, RECEIVE_LIBRARIANS } from '../actions/librarians'

export default(state = { status: statuses.FETCHING }, action) => {
  switch (action.type) {
    case REQUEST_LIBRARIANS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case RECEIVE_LIBRARIANS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.data,
      })
    default:
      return state
  }
}
