'use strict'
import { connect } from 'react-redux'
import SearchDrawer from './presenter.js'
import { searchOptions } from './searchOptions.js'

const mapStateToProps = (state, ownProps) => {
  const searchType = (state.search.hasPref && state.search.usePref) ? state.search.pref.uid : state.search.searchType

  const currentSearch = searchOptions.find(op => op.uid === searchType) ? searchOptions.find(op => op.uid === searchType) : searchOptions[0]

  return {
    search: state.search,
    currentSearch: currentSearch,
  }
}

export default connect(
  mapStateToProps
)(SearchDrawer)
