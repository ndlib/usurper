import React from 'react'
import { connect } from 'react-redux'
import { openSearchBox } from '../../../actions/search.js'
import SearchBox from './presenter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick:(e) => {
      ownProps.dispatch(openSearchBox())
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    },
  }
}

export default connect(mapDispatchToProps)(SearchBox)
