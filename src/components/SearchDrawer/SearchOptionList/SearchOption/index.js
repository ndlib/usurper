import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actions } from '../../../../actions/search'
import SearchOption from './presenter'

const mapStateToProps = (state) => {
  return {
    searchType: state.searchType
  }
}

const mapActionsToProps = (dispatch) => {
  var actionsToUse = Object.assign({}, actions)
  return bindActionCreators(actionsToUse, dispatch)
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SearchOption)
