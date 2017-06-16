import { CF_REQUEST_DATABASE_LETTER, CF_RECEIVE_DATABASE_LETTER } from '../../actions/contentful/databaseLetter'
import * as statuses from '../../constants/APIStatuses'

export default(state = { status: statuses.FETCHING }, action) => {
  switch (action.type) {
    case CF_REQUEST_DATABASE_LETTER:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_DATABASE_LETTER:
      return Object.assign({}, state, {
        status: action.status,
        json: action.letter,
      })
    default:
      return state
  }
}
