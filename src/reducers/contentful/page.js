import { CF_REQUEST_PAGE, CF_RECEIVE_PAGE, CF_CLEAR_PAGE } from '../../actions/contentful/page'
import * as statuses from '../../constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_PAGE:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        slug: action.slug,
      })
    case CF_RECEIVE_PAGE:
      return Object.assign({}, state, {
        status: action.status,
        json: action.page,
        slug: action.slug,
      })
    case CF_CLEAR_PAGE:
      return {
        status: statuses.NOT_FETCHED,
      }
    default:
      return state
  }
}
