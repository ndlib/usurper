import React from 'react'
import { connect } from 'react-redux'
import AdvancedSearch from './presenter'
import searchQuery from '../searchQueryBuilder'
const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

const mergeProps = (state, dispatch, ownProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      searchQuery(state.search, state.advancedSearch)
    },
    ...state,
    ...dispatch,
    ...ownProps,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AdvancedSearch)
