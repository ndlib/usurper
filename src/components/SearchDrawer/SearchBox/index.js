import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { openSearchBox, closeSearchBox } from '../../../actions/search.js'
import { setSearchOption } from '../../../actions/advancedSearch.js'
import searchQuery from '../searchQueryBuilder'
import SearchBox from './presenter'
const mapStateToProps = (state, ownProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      searchQuery(state.search, state.advancedSearch)
    },
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
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },

  }
}
export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox))
