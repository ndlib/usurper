import {
  SET_SEARCH,
  OPEN_SEARCHBOX,
  CLOSE_SEARCHBOX,
  SAVE_SEARCH_PREFERENCE,
  CLEAR_SEARCH_PREFERENCE
} from '../actions/search.js'

const localSearchPref = localStorage.getItem('searchPreference')
export default (

  state = {
    searchType: 'ONESEARCH',
    searchBoxOpen: false,
    hasPref: localSearchPref !== null,
    usePref: true,
    pref: localSearchPref || null
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH:
      let newState = Object.assign({}, state, {
        searchType: action.searchType,
        usePref: false
      })
      return newState
    case OPEN_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: true })
    case CLOSE_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: false })
    case SAVE_SEARCH_PREFERENCE:
      localStorage.setItem('searchPreference', action.pref)
      return Object.assign(
        {},
        state,
        { hasPref: true, usePref: true, pref: action.pref }
      )
    case CLEAR_SEARCH_PREFERENCE:
      localStorage.removeItem('searchPreference')
      return Object.assign(
        {},
        state,
        { hasPref: false, usePref: false, pref: null }
      )
    default:
      return state
  }
}
