import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import AdvancedSearch from './presenter'
import searchQuery from '../searchQueryBuilder'
import { setSearchType } from '../../../actions/search.js'
import './style.css'

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dropdownOnChange: (e) => {
      dispatch(setSearchType(e.target.value))
    },
  }
}

const mergeProps = (state, dispatch, ownProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      searchQuery(state.search, state.advancedSearch, ownProps.history)
    },
    ...state,
    ...dispatch,
    ...ownProps,
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AdvancedSearch))
