import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { openSearchBox, closeSearchBox } from '../../../actions/search.js'
import { setSearchOption } from '../../../actions/advancedSearch.js'
import searchQuery from '../searchQueryBuilder'
import SearchBox from './presenter'
import ReactGA from 'react-ga'
import Config from '../../../shared/Configuration'
ReactGA.initialize(Config.googleAnalyticsId, {
  debug: false,
  titleCase: false,
  gaOptions: {},

})

const mapStateToProps = (state, ownProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      ReactGA.event({
        category: `LIBRARY WEBSITE SEARCH SUBMISSION`,
        action: `${state.search.searchType}`,
        label: `${state.advancedSearch['basic-search-field']}`,
      })
      searchQuery(state.search, state.advancedSearch)
    },
    ...state,
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const toggle = (e) => {
    if (ownProps.search.searchBoxOpen) {
      dispatch(closeSearchBox())
    } else {
      dispatch(openSearchBox())
    }
    e.preventDefault()
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }

  return {
    onClick:(e) => {
      toggle(e)
    },
    onKeyDown: (e) => {
      if (e.keyCode === 13) {
        dispatch(toggle(e))
      } else if (e.keyCode === 40) {
        e.preventDefault()
        dispatch(openSearchBox())
        setTimeout(() => { document.getElementById('uSearchOption_0').focus() }, 50)
      }
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
