import { CF_REQUEST_ENTRY, CF_RECEIVE_ENTRY, CF_NO_SUCH_ENTRY } from '../../actions/contentful/entry'
import * as statuses from '../../constants/APIStatuses'

export default(state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ENTRY:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ENTRY:
      return Object.assign({}, state, {
        status: action.status,
        json: action.page,
      })
    case CF_NO_SUCH_ENTRY:
      return Object.assign({}, state, {
        status: action.status,
      })
    default:
      return state
  }
}
