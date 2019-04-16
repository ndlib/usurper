import { CF_REQUEST_FLOOR, CF_RECEIVE_FLOOR } from '../../actions/contentful/floor'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.FETCHING }, action) => {
  switch (action.type) {
    case CF_REQUEST_FLOOR:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_FLOOR:
      return Object.assign({}, state, {
        status: action.status,
        json: action.floor,
      })
    default:
      return state
  }
}
