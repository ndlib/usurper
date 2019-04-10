import { RECEIVE_PERSONAL, CLEAR_PERSONAL, REQUEST_PERSONAL } from '../actions/personal/constants'
import * as statuses from '../constants/APIStatuses'

const initialState = {}
const personalReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PERSONAL:
      const data = {}
      data[action.requestType] = Object.assign({}, { state: action.state }, action.payload)
      return Object.assign({}, state, data)
    case CLEAR_PERSONAL:
      return {}
    case REQUEST_PERSONAL:
      const retrieving = {}
      retrieving[action.requestType] = { state: statuses.FETCHING }
      return Object.assign({}, state, retrieving)
    default:
      return state
  }
}
export default personalReducer
