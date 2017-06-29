import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import AdvancedSearch from './presenter'
import searchQuery from '../searchQueryBuilder'
import './style.css'
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
