import { CF_REQUEST_DATABASE_LETTER, CF_RECEIVE_DATABASE_LETTER } from 'actions/contentful/databaseLetter'
import * as statuses from 'constants/APIStatuses'

const initialState = {}
'abcdefghijklmnopqrstuvwxyz#'.split('').forEach((char) => {
  initialState[char] = { status: statuses.NOT_FETCHED }
})

export default (state = initialState, action) => {
  const letterData = {}

  switch (action.type) {
    case CF_REQUEST_DATABASE_LETTER:
      letterData[action.letter] = {
        status: statuses.FETCHING,
      }
      return Object.assign({}, state, letterData)

    case CF_RECEIVE_DATABASE_LETTER:
      letterData[action.letter] = {
        status: action.status,
        data: action.data,
      }
      return Object.assign({}, state, letterData)

    default:
      return state
  }
}
