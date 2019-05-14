import { CF_REQUEST_BRANCHES, CF_RECEIVE_BRANCHES } from 'actions/contentful/branches'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_BRANCHES:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        depth: action.depth,
      })
    case CF_RECEIVE_BRANCHES:
      return Object.assign({}, state, {
        status: action.status,
        depth: action.depth,
        data: action.branches,
      })
    default:
      return state
  }
}
