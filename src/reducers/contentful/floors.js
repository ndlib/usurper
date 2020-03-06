import { CF_REQUEST_FLOORS, CF_RECEIVE_FLOORS } from 'actions/contentful/floors'
import * as statuses from 'constants/APIStatuses'

export default (state = { json: [], status: statuses.FETCHING }, action) => {
  switch (action.type) {
    case CF_REQUEST_FLOORS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_FLOORS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.floor,
      })
    default:
      return state
  }
}
