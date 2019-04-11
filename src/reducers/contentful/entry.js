import { CF_REQUEST_ENTRY, CF_RECEIVE_ENTRY, CF_NO_SUCH_ENTRY } from '../../actions/contentful/entry'
import * as statuses from '../../constants/APIStatuses'

export default (state = {}, action) => {
  const entryData = {}

  switch (action.type) {
    case CF_REQUEST_ENTRY:
      entryData[action.entry] = {
        status: statuses.FETCHING,
      }
      return Object.assign({}, state, entryData)
    case CF_RECEIVE_ENTRY:
      entryData[action.entry] = {
        status: action.status,
        json: action.page,
      }
      return Object.assign({}, state, entryData)
    case CF_NO_SUCH_ENTRY:
      entryData[action.entry] = {
        status: action.status,
      }
      return Object.assign({}, state, entryData)
    default:
      return state
  }
}
