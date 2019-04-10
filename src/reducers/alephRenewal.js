import { RECEIVE_RENEWAL, REQUEST_RENEWAL } from '../actions/personal/alephRenewal'
import * as statuses from '../constants/APIStatuses'

const initialState = {}
const renewalReducer = (state = initialState, action) => {
  const data = {}
  switch (action.type) {
    case RECEIVE_RENEWAL:
      data[action.barcode] = { state: action.state, data: action.json }
      return Object.assign({}, state, data)
    case REQUEST_RENEWAL:
      data[action.barcode] = { state: statuses.FETCHING, data: {} }
      return Object.assign({}, state, data)
    default:
      return state
  }
}
export default renewalReducer
