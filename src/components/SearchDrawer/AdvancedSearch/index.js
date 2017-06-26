import React from 'react'
import { connect } from 'react-redux'
import AdvancedSearch from './presenter'
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
      console.log(state.advancedSearch)
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
