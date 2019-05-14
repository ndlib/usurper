import {
  KIND,
  RECEIVE_FAVORITES,
  REQUEST_FAVORITES,
  RECEIVE_UPDATE_FAVORITES,
  REQUEST_UPDATE_FAVORITES,
  RECEIVE_SEARCH_FAVORITES,
  REQUEST_SEARCH_FAVORITES,
} from 'actions/personal/favorites'

import * as statuses from 'constants/APIStatuses'

const initialState = {}
for (const key in KIND) {
  initialState[KIND[key]] = { state: statuses.NOT_FETCHED }
  initialState['update'] = initialState['update'] || {}
  initialState['update'][KIND[key]] = { state: statuses.NOT_FETCHED }
}

const favoritesReducer = (state = initialState, action) => {
  const data = {}
  switch (action.type) {
    case RECEIVE_FAVORITES:
      data[action.kind] = { state: action.state, items: action.items }
      return Object.assign({}, state, data)
    case REQUEST_FAVORITES:
      data[action.kind] = { state: statuses.FETCHING }
      return Object.assign({}, state, data)
    case RECEIVE_UPDATE_FAVORITES:
      data['update'] = {}
      data['update'][action.kind] = { state: action.state, error: action.error }
      data['update'] = Object.assign({}, state['update'], data['update'])
      return Object.assign({}, state, data)
    case REQUEST_UPDATE_FAVORITES:
      data['update'] = {}
      data['update'][action.kind] = { state: statuses.FETCHING }
      data['update'] = Object.assign({}, state['update'], data['update'])
      return Object.assign({}, state, data)
    case RECEIVE_SEARCH_FAVORITES:
      // Ignore response if it is not the most recent request
      if (action.searchText && action.searchText !== state['search'][action.kind].searchText) {
        return state
      }
      data['search'] = {}
      data['search'][action.kind] = {
        searchText: action.searchText,
        state: action.state,
        results: action.kind === KIND.subjects
          ? action.results.filter((subject) => {
            return subject.title && subject.title.toLowerCase().includes(action.searchText.toLowerCase())
          })
          : action.results,
      }
      data['search'] = Object.assign({}, state['search'], data['search'])
      return Object.assign({}, state, data)
    case REQUEST_SEARCH_FAVORITES:
      data['search'] = {}
      data['search'][action.kind] = { searchText: action.searchText, state: statuses.FETCHING }
      data['search'] = Object.assign({}, state['search'], data['search'])
      return Object.assign({}, state, data)
    default:
      return state
  }
}
export default favoritesReducer
