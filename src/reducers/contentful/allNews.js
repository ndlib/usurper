import { CF_REQUEST_ALLNEWS, CF_RECEIVE_ALLNEWS, CF_NO_SUCH_ALLNEWS } from '../../actions/contentful/allNews'
import * as statuses from '../../constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALLNEWS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALLNEWS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.allNews,
      })
    case CF_NO_SUCH_ALLNEWS:
      return Object.assign({}, state, {
        status: action.status,
      })
    default:
      return state
  }
}
