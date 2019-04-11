import { connect } from 'react-redux'
import SearchDrawer from './presenter.js'
import { searchOptions } from '../../constants/searchOptions.js'
import { openAdvancedSearch, closeAdvancedSearch } from '../../actions/search'

const mapStateToProps = (state) => {
  const selectedOption = searchOptions.find(op => op.uid === state.search.searchType)
  const currentSearch = selectedOption || searchOptions[0]
  return {
    search: state.search,
    currentSearch: currentSearch,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    advancedButtonLabel: ownProps.search.advancedSearch ? 'Basic Search' : 'Advanced Search',
    toggleAdvancedSearch: (e) => {
      if ((e.type === 'keydown' && e.keyCode === 13) || e.type === 'click') {
        ownProps.search.advancedSearch ? dispatch(closeAdvancedSearch()) : dispatch(openAdvancedSearch())
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchDrawer)
