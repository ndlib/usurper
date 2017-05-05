import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../../actions/personal'

import LoginStatus from './presenter'

function mapStateToProps (state) {
  const { personal } = state
  return {
    token: personal.token,
    netid: personal.netid,
    firstName: personal.firstName,
    lastName: personal.lastName,
    displayName: personal.displayname
  }
}

function mapActionsToProps (dispatch) {
  var actionsToUse = Object.assign({}, actions)
  return bindActionCreators(actionsToUse, dispatch)
}

export default connect(mapStateToProps, mapActionsToProps)(LoginStatus)
