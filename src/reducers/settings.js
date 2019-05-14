import {
  KIND,
  RECEIVE_SETTINGS,
  REQUEST_SETTINGS,
  RECEIVE_UPDATE_SETTINGS,
  REQUEST_UPDATE_SETTINGS,
} from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

const initialState = {}
for (const key in KIND) {
  initialState[KIND[key]] = { state: statuses.NOT_FETCHED }
  initialState['update'] = initialState['update'] || {}
  initialState['update'][KIND[key]] = { state: statuses.NOT_FETCHED }
}

const renewalReducer = (state = initialState, action) => {
  const data = {}
  switch (action.type) {
    case RECEIVE_SETTINGS:
      data[action.kind] = { state: action.state, data: action.data, error: action.error }
      return Object.assign({}, state, data)
    case REQUEST_SETTINGS:
      data[action.kind] = { state: statuses.FETCHING, data: action.data }
      return Object.assign({}, state, data)
    case RECEIVE_UPDATE_SETTINGS:
      data['update'] = {}
      data['update'][action.kind] = { state: action.state, error: action.error }
      data['update'] = Object.assign({}, state['update'], data['update'])
      return Object.assign({}, state, data)
    case REQUEST_UPDATE_SETTINGS:
      data['update'] = {}
      data['update'][action.kind] = { state: statuses.FETCHING }
      data['update'] = Object.assign({}, state['update'], data['update'])
      return Object.assign({}, state, data)
    default:
      return state
  }
}
export default renewalReducer
