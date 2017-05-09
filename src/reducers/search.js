import { SET_SEARCH, OPEN_SEARCHBOX, CLOSE_SEARCHBOX } from '../actions/search.js'

export default (state = { searchType: 0, searchBoxOpen: false }, action) => {
  switch (action.type) {
    case SET_SEARCH:
      let newState = Object.assign({}, state, {
        searchType: action.searchType
      })
      return newState
    case OPEN_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: true })
    case CLOSE_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: false })
    default:
      return state
  }
}
