import React from 'react'
import { connect } from 'react-redux'
import { openSearchBox, closeSearchBox } from '../../../actions/search.js'
import SearchBox from './presenter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick:(e) => {
      if (ownProps.search.searchBoxOpen) {
        ownProps.dispatch(closeSearchBox())
      } else {
        ownProps.dispatch(openSearchBox())
      }

      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    },
  }
}

export default connect(mapDispatchToProps)(SearchBox)
