import React from 'react'
import { connect } from 'react-redux'
import { openSearchBox, closeSearchBox } from '../../../actions/search.js'
import SearchBox from './presenter'
const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick:(e) => {
      if (ownProps.search.searchBoxOpen) {
        dispatch(closeSearchBox())
      } else {
        dispatch(openSearchBox())
      }

      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox)
