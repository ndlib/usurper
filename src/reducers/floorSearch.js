import { FLOOR_SEARCH_REQUEST, FLOOR_SEARCH_RECEIVE } from '../actions/floorSearch'
import * as statuses from '../constants/APIStatuses'

export default(state = { status: statuses.NOT_FETCHED, slug: undefined }, action) => {
  switch (action.type) {
    case FLOOR_SEARCH_REQUEST:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case FLOOR_SEARCH_RECEIVE:
      return Object.assign({}, state, {
        status: action.status,
        slug: action.slug,
      })
    default:
      return state
  }
}
