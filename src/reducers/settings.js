import { RECEIVE_SETTINGS, REQUEST_SETTINGS } from '../actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

const initialState = {}
const renewalReducer = (state = initialState, action) => {
  const data = {}
  switch (action.type) {
    case RECEIVE_SETTINGS:
      data[action.kind] = { state: action.state, data: action.data, json: action.json }
      return Object.assign({}, state, data)
    case REQUEST_SETTINGS:
      data[action.kind] = { state: statuses.FETCHING, data: action.data }
      return Object.assign({}, state, data)
    default:
      return state
  }
}
export default renewalReducer
