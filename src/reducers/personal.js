import { PERSONAL_INFO, PERSONAL_INFO_CLEAR, PERSONAL_RETREIVING } from '../actions/personal'

const initialState = {}
export default function personalReducer (state = initialState, action) {
  switch (action.type) {
    case PERSONAL_INFO:
      return Object.assign({}, state, action.payload)
    case PERSONAL_INFO_CLEAR:
      return {}
    case PERSONAL_RETREIVING:
      var retrieving = {}
      retrieving[action.requestType] = action.retrieving
      return Object.assign({}, state, retrieving)
    default:
      return state
  }
}
