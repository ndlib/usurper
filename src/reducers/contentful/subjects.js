import { CF_REQUEST_SUBJECTS, CF_RECEIVE_SUBJECTS } from 'actions/contentful/subjects'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_SUBJECTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        depth: action.depth,
      })
    case CF_RECEIVE_SUBJECTS:
      return Object.assign({}, state, {
        status: action.status,
        depth: action.depth,
        data: Array.isArray(action.items) ? action.items.map((item) => helper.mergeInternalLink(item, action.items)) : null,
      })
    default:
      return state
  }
}
