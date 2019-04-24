import { CF_REQUEST_NEWS, CF_RECEIVE_NEWS } from 'actions/contentful/news'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_NEWS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_NEWS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.news,
      })
    default:
      return state
  }
}
