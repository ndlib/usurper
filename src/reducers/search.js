import { SET_SEARCH } from '../actions/search.js'

export default (state = { searchType: 0 }, action) => {
  switch (action.type) {
    case SET_SEARCH:
      let newState = Object.assign({}, state, {
        searchType: action.searchType
      })
      return newState
    default:
      return state
  }
}
