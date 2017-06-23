'use strict'
import { connect } from 'react-redux'
import SearchDrawer from './presenter.js'
import { searchOptions } from './searchOptions.js'
import { openAdvancedSearch, closeAdvancedSearch } from '../../actions/search'

const mapStateToProps = (state, ownProps) => {
  const searchType = (state.search.hasPref && state.search.usePref) ? state.search.pref.uid : state.search.searchType

  const currentSearch = searchOptions.find(op => op.uid === searchType) ? searchOptions.find(op => op.uid === searchType) : searchOptions[0]

  return {
    search: state.search,
    currentSearch: currentSearch,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    advancedButtonLabel: ownProps.search.advancedSearch ? 'Basic Search' : 'Advanced Search',
    toggleAdvancedSearch: () => {
      ownProps.search.advancedSearch ? dispatch(closeAdvancedSearch()) : dispatch(openAdvancedSearch())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawer)
