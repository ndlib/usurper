import { CF_REQUEST_SIDEBAR, CF_RECEIVE_SIDEBAR } from 'actions/contentful/staticContent'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_SIDEBAR:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        slug: action.slug,
        json: null, // Clear out any old data in case slug changed
      })
    case CF_RECEIVE_SIDEBAR:
      return Object.assign({}, state, {
        status: action.status,
        json: action.data,
        slug: action.slug,
      })
    default:
      return state
  }
}
