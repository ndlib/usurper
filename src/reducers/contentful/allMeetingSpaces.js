import { CF_REQUEST_MEETING_SPACES, CF_RECEIVE_MEETING_SPACES } from 'actions/contentful/allMeetingSpaces'
import * as statuses from 'constants/APIStatuses'

export default (state = { json: [], status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_MEETING_SPACES:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_MEETING_SPACES:
      return Object.assign({}, state, {
        status: action.status,
        json: action.spaces,
      })
    default:
      return state
  }
}
