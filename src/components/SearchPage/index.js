import { connect } from 'react-redux'
import SearchPage from './presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'
import { fetchResults, setSearchType } from 'actions/search.js'

const mapStateToProps = (state) => {
  return {
    query: state.search.query,
    items: state.search.items,
    searchInformation: state.search.searchInformation,
    queries: state.search.queries,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResults: (query) => {
      dispatch(fetchResults(query))
    },
    setSearchType: (type) => {
      dispatch(setSearchType(type))
    },
  }
}

const SearchPageComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)

export default withErrorBoundary(SearchPageComponent)
