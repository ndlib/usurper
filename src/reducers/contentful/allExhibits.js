import {
  CF_REQUEST_ALL_EXHIBITS,
  CF_RECEIVE_ALL_EXHIBITS,
} from 'actions/contentful/allExhibits'
import { mapExhibit } from './exhibit'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_ALL_EXHIBITS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
      })
    case CF_RECEIVE_ALL_EXHIBITS:
      return Object.assign({}, state, {
        status: action.status,
        json: action.allExhibits ? action.allExhibits.map(mapExhibit) : null,
      })
    default:
      return state
  }
}
