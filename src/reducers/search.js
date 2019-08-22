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
  SITE_SEARCH_REQUEST,
  SITE_SEARCH_RESPONSE,
} from 'actions/search.js'
import { CF_RECEIVE_PAGE } from 'actions/contentful/page'
import * as statuses from 'constants/APIStatuses'
import { searchOptions, DEFAULT } from 'constants/searchOptions'

let localSearchPref
let localStorageIsAvailable = false
try {
  localSearchPref = localStorage.getItem('searchPreference')
  localStorageIsAvailable = true
} catch (e) {
  console.log('Local storage is not available.')
}

// Sets search type based on a priority sequence. Note: This modifies the
// newState passed in, so assumes you've already created a copy of the state
const setSearchType = (newState) => {
  // User's session
  if (newState.sessionPref) {
    newState.searchType = newState.sessionPref
    return
  }

  // User's saved preference
  if (newState.hasPref && newState.usePref) {
    newState.searchType = newState.pref.uid
    return
  }

  // Preference defined by the page/content
  if (newState.pageSearchPref) {
    newState.searchType = newState.pageSearchPref
    return
  }

  // Fallback default
  newState.searchType = DEFAULT
}

const defaultState = () => {
  const state = {
    drawerOpen: true,
    searchType: null,
    searchBoxOpen: false,
    advancedSearch: false,
    hasPref: localSearchPref !== null,
    usePref: true,
    pref: localSearchPref ? (JSON.parse(localSearchPref) || null) : null,
  }
  setSearchType(state)
  return state
}

export default (
  state = defaultState(),
  action
) => {
  switch (action.type) {
    case SET_SEARCH: {
      const newOption = searchOptions.find((el) => {
        return el.uid === action.searchType
      })
      const newState = Object.assign({}, state, {
        sessionPref: action.searchType,
        advancedSearch: (newOption && newOption.enableAdvancedSearch) ? state.advancedSearch : false,
      })
      setSearchType(newState)
      return newState
    }
    case OPEN_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: true })
    case CLOSE_SEARCHBOX:
      return Object.assign({}, state, { searchBoxOpen: false })

    case OPEN_ADVANCED_SEARCH:
      return Object.assign({}, state, { advancedSearch: true })
    case CLOSE_ADVANCED_SEARCH:
      return Object.assign({}, state, { advancedSearch: false })
    case SAVE_SEARCH_PREFERENCE:
      if (!action.pref) {
        return Object.assign(
          {},
          state,
          { hasPref: false, usePref: false, pref: null }
        )
      }
      const newState = Object.assign(
        {},
        state,
        {
          sessionPref: action.pref.searchType,
          hasPref: true,
          usePref: true,
          pref: action.pref,
        }
      )
      setSearchType(newState)

      if (localStorageIsAvailable) {
        localStorage.setItem('searchPreference', JSON.stringify(action.pref))
      }

      return newState
    case CLEAR_SEARCH_PREFERENCE:

      if (localStorageIsAvailable) {
        localStorage.removeItem('searchPreference')
      }

      return Object.assign(
        {},
        state,
        { hasPref: false, usePref: false, pref: null }
      )
    case OPEN_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: true })
    case CLOSE_SEARCHDRAWER:
      return Object.assign({}, state, { drawerOpen: false })
    case SITE_SEARCH_REQUEST:
      return Object.assign({}, state, { query: action.query })
    case SITE_SEARCH_RESPONSE:
      return Object.assign({}, state, {
        items: action.items,
        searchInformation: action.searchInformation,
        queries: action.queries,
      })
    case CF_RECEIVE_PAGE:
      if (action.status === statuses.SUCCESS) {
        const newState = Object.assign({}, state, {
          pageSearchPref: action.page.fields.defaultSearchScope,
        })
        setSearchType(newState)
        return newState
      }
      return state
    default:
      return state
  }
}
