import {
  SET_SEARCH,
  OPEN_SEARCHBOX,
  CLOSE_SEARCHBOX,
  OPEN_ADVANCED_SEARCH,
  CLOSE_ADVANCED_SEARCH,
  SAVE_SEARCH_PREFERENCE,
  CLEAR_SEARCH_PREFERENCE,
  OPEN_SEARCHDRAWER,
  CLOSE_SEARCHDRAWER,
} from '../actions/search.js'

const localSearchPref = localStorage.getItem('searchPreference')
export default (
  state = {
    drawerOpen: true,
    searchType: localSearchPref || 'ONESEARCH',
    searchBoxOpen: false,
    advancedSearch: false,
    hasPref: localSearchPref !== null,
    usePref: true,
    pref: JSON.parse(localSearchPref) || null,
  },
  action
) => {
  switch (action.type) {
    case SET_SEARCH:
      return Object.assign({}, state, {
        searchType: action.searchType,
        usePref: false,
      })
    case OPEN_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: true })
    case CLOSE_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: false })

    case OPEN_ADVANCED_SEARCH:
      return Object.assign({}, state, { advancedSearch: true })
    case CLOSE_ADVANCED_SEARCH:
      return Object.assign({}, state, { advancedSearch: false })
    case SAVE_SEARCH_PREFERENCE:
      localStorage.setItem('searchPreference', JSON.stringify(action.pref))
      return Object.assign(
        {},
        state,
        {
          hasPref: true,
          usePref: true,
          pref: action.pref,
        }
      )
    case CLEAR_SEARCH_PREFERENCE:
      localStorage.removeItem('searchPreference')
      return Object.assign(
        {},
        state,
        { hasPref: false, usePref: false, pref: null }
      )
    case OPEN_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: true })
    case CLOSE_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: false })
    default:
      return state
  }
}
