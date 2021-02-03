import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SearchDrawer from './presenter.js'
import { searchOptions, DEFAULT } from 'constants/searchOptions.js'
import { saveSearchPreference } from 'actions/search'
import { getDefaultSearch, KIND as SETTINGS_KIND } from 'actions/personal/settings'

import * as statuses from 'constants/APIStatuses'

const SearchDrawerContainer = (props) => {
  useEffect(() => {
    if (props.loggedIn && props.settings[SETTINGS_KIND.defaultSearch].state === statuses.NOT_FETCHED) {
      props.getDefaultSearch()
    } else if (props.settings[SETTINGS_KIND.defaultSearch].state === statuses.SUCCESS) {
      const defaultSearchAccountPref = props.settings[SETTINGS_KIND.defaultSearch].data
      const savedOption = searchOptions.find(x => x.uid === defaultSearchAccountPref)
      if (props.search.usePref && savedOption && (!props.search.pref || defaultSearchAccountPref !== props.search.pref.uid)) {
        props.saveSearchPreference(savedOption)
      }
    }
  }, [props.loggedIn, props.settings, props.search, props.getDefaultSearch, props.saveSearchPreference])

  return (
    <SearchDrawer {...props} />
  )
}

const mapStateToProps = (state) => {
  const selectedOption = searchOptions.find(op => op.uid === state.search.searchType)
  const currentSearch = selectedOption || searchOptions.find(op => op.uid === DEFAULT)
  return {
    search: state.search,
    currentSearch: currentSearch,
    loggedIn: !!(state.personal.login && state.personal.login.token),
    settings: state.settings,
  }
}

const mapDispatchToProps = (dispatch, state) => {
  const { search } = state

  return {
    ...bindActionCreators({ getDefaultSearch, saveSearchPreference }, dispatch),
    advancedButtonLabel: search.advancedSearch ? 'Basic Search' : 'Advanced Search',
    // Advanced search is disabled. Send the user straight to primo
    // toggleAdvancedSearch: (e) => {
    //   if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
    //     search.advancedSearch ? dispatch(closeAdvancedSearch()) : dispatch(openAdvancedSearch())
    //   }
    // },
  }
}

SearchDrawerContainer.propTypes = {
  search: PropTypes.shape({
    usePref: PropTypes.bool,
    pref: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }).isRequired,
  currentSearch: PropTypes.object,
  loggedIn: PropTypes.bool,
  settings: PropTypes.shape({
    [SETTINGS_KIND.defaultSearch]: PropTypes.shape({
      state: PropTypes.string.isRequired,
    }),
  }),
  getDefaultSearch: PropTypes.func.isRequired,
  saveSearchPreference: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawerContainer)
