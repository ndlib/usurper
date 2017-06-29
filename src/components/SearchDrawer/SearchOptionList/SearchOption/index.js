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
  const onSubmit = (e) => {
    dispatch(setSearchType(ownProps.item.uid))
    dispatch(closeSearchBox())
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  return {
    onClick: (e) => {
      onSubmit(e)
    },
    onKeyDown: (e) => {
      if (e.keyCode === 13) {
        onSubmit(e)
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOption)
