import React from 'react'
import { connect } from 'react-redux'
import { saveSearchPreference, clearSearchPreference } from '../../../actions/search.js'
import SearchPreference from './presenter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveClick: () => {
      ownProps.dispatch(saveSearchPreference(ownProps.currentSearch))
    },
    forgetClick: () => {
      ownProps.dispatch(clearSearchPreference())
    }
  }
}

export default connect(mapDispatchToProps)(SearchPreference)
