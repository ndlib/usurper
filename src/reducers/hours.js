import { HOURS_REQUEST, HOURS_RECEIVE } from 'actions/hours'
import * as statuses from 'constants/APIStatuses'

const initialState = {
  status: statuses.NOT_FETCHED,
  json: {},
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOURS_REQUEST:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case HOURS_RECEIVE:
      return Object.assign({}, state, {
        status: action.status,
        json: action.hours,
      })
    default:
      return state
  }
}
