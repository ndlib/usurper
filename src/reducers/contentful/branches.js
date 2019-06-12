import { CF_REQUEST_BRANCHES, CF_RECEIVE_BRANCHES } from 'actions/contentful/branches'
import * as statuses from 'constants/APIStatuses'
import typy from 'typy'

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
        // If there is no alternateTitle, use the title. This makes it easier to consume alternateTitle because it will always have a value
        data: typy(action.branches).safeArray.map((branch) => ({
          ...branch,
          fields: {
            ...branch.fields,
            alternateTitle: branch.fields.alternateTitle || branch.fields.title,
          },
        })),
      })
    default:
      return state
  }
}
