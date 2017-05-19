import React from 'react'
import { connect } from 'react-redux'
import SearchOption from './presenter'

import { setSearchType, closeSearchBox } from '../../../../actions/search.js'
const mapStateToProps = (state) => {
  return {
    searchType: state.searchType,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      dispatch(setSearchType(ownProps.item.uid))
      dispatch(closeSearchBox())
      e.stopPropagation()
      e.nativeEvent.stopImmediatePropagation()
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOption)
