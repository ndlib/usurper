import React from 'react'
import { connect } from 'react-redux'
import { saveSearchPreference, clearSearchPreference } from '../../../actions/search.js'
import SearchPreference from './presenter'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveClick: () => {
      dispatch(saveSearchPreference(ownProps.currentSearch))
    },
    forgetClick: () => {
      dispatch(clearSearchPreference())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPreference)
