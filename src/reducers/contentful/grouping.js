import {
  CF_REQUEST_GROUPING,
  CF_RECEIVE_GROUPING,
} from 'actions/contentful/grouping'
import * as statuses from 'constants/APIStatuses'

const initialState = {}
export default (state = initialState, action) => {
  switch (action.type) {
    case CF_REQUEST_GROUPING:
      return Object.assign({}, state, {
        [action.id]: {
          status: statuses.FETCHING,
        },
      })
    case CF_RECEIVE_GROUPING:
      return Object.assign({}, state, {
        [action.id]: {
          status: action.status,
          data: action.grouping,
        },
      })
    default:
      return state
  }
}
