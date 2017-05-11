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
    displayName: personal.displayname,
    buttonUrl: personal.buttonUrl,
    // This "service = window.location" is to redirect back to this location after logging out
      // It will only work if you're on a site https://*.library.nd.edu (eg. alpha) because OIT CAS is very strict
    logoutUrl: personal.logoutUrl,
  }
}

function mapActionsToProps (dispatch) {
  var actionsToUse = Object.assign({}, actions)
  return bindActionCreators(actionsToUse, dispatch)
}

export default connect(mapStateToProps, mapActionsToProps)(LoginStatus)
