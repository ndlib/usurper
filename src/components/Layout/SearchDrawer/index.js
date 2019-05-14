import { connect } from 'react-redux'
import SearchDrawer from './presenter.js'
import { searchOptions, DEFAULT } from 'constants/searchOptions.js'
import { openAdvancedSearch, closeAdvancedSearch, saveSearchPreference } from 'actions/search'
import { getDefaultSearch, KIND as SETTINGS_KIND } from 'actions/personal/settings'

import * as statuses from 'constants/APIStatuses'
const mapStateToProps = (state) => {
  const selectedOption = searchOptions.find(op => op.uid === state.search.searchType)
  const currentSearch = selectedOption || searchOptions.find(op => op.uid === DEFAULT)
  return {
    search: state.search,
    currentSearch: currentSearch,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  const { personal, settings, search } = state

  const loggedIn = !!(personal.login && personal.login.token)
  if (loggedIn && settings[SETTINGS_KIND.defaultSearch].state === statuses.NOT_FETCHED) {
    dispatch(getDefaultSearch())
  } else if (settings[SETTINGS_KIND.defaultSearch].state === statuses.SUCCESS) {
    const defaultSearchAccountPref = settings[SETTINGS_KIND.defaultSearch].data
    const savedOption = searchOptions.find(x => x.uid === defaultSearchAccountPref)
    if (search.usePref && savedOption && (!search.pref || defaultSearchAccountPref !== search.pref.uid)) {
      dispatch(saveSearchPreference(savedOption))
    }
  }

  return {
    advancedButtonLabel: search.advancedSearch ? 'Basic Search' : 'Advanced Search',
    toggleAdvancedSearch: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        search.advancedSearch ? dispatch(closeAdvancedSearch()) : dispatch(openAdvancedSearch())
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawer)
