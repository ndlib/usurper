import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../../../actions/search'
import SearchOption from './presenter'

function mapStateToProps (state) {
  console.log('ms2p: ', state)
  return {
    searchType: state.searchType
  }
}

function mapActionsToProps (dispatch) {
  var actionsToUse = Object.assign({}, actions)
  return bindActionCreators(actionsToUse, dispatch)
}

export default connect(mapStateToProps, mapActionsToProps)(SearchOption)
