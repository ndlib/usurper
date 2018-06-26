import { connect } from 'react-redux'
import SearchPage from './presenter.js'

import Search from '../../actions/search.js'

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
      dispatch(Search.fetchResults(query))
    },
    setSearchType: (type) => {
      dispatch(Search.setSearchType(type))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage)
