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
      let i
      switch (e.keyCode) {
        case 9: // tab key
          e.preventDefault()
          break
        case 38: //  up arrow
          e.preventDefault()
          i = e.target.value - 1
          if (i < 0) {
            i = document.querySelectorAll('.uSearchOption').length - 1
          }
          document.getElementById(`uSearchOption_${i}`).focus()
          break
        case 40: // down arrow
          e.preventDefault()
          i = e.target.value + 1
          if (i >= document.querySelectorAll('.uSearchOption').length) {
            i = 0
          }
          document.getElementById(`uSearchOption_${i}`).focus()
          break
        case 13: // enter
          onSubmit(e)
          document.getElementById(`selected-search`).focus()
          break
        default: // do nothing on other keys
          break
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOption)
