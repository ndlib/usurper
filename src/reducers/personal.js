import { RECEIVE_PERSONAL, CLEAR_PERSONAL, REQUEST_PERSONAL } from 'actions/personal/constants'
import { KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

const initialState = {
  login: { state: statuses.NOT_FETCHED },
  user: { state: statuses.NOT_FETCHED },
  alephHaveNdu: { state: statuses.NOT_FETCHED },
  alephHaveHcc: { state: statuses.NOT_FETCHED },
  alephPendingNdu: { state: statuses.NOT_FETCHED },
  alephPendingHcc: { state: statuses.NOT_FETCHED },
  illHave: { state: statuses.NOT_FETCHED },
  illPending: { state: statuses.NOT_FETCHED },
  historical: { state: statuses.NOT_FETCHED },
  deleteHistorical: { state: statuses.NOT_FETCHED },
  courses: { state: statuses.NOT_FETCHED },
  favorites: {},
}
Object.values(KIND).forEach((value) => {
  initialState.favorites[value] = { state: statuses.NOT_FETCHED }
})

const personalReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PERSONAL:
      const data = {}
      data[action.requestType] = Object.assign({}, { state: action.state }, action.payload)
      return Object.assign({}, state, data)
    case CLEAR_PERSONAL:
      return initialState
    case REQUEST_PERSONAL:
      const retrieving = {}
      retrieving[action.requestType] = { state: statuses.FETCHING }
      return Object.assign({}, state, retrieving)
    default:
      return state
  }
}
export default personalReducer
