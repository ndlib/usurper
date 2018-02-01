import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getToken from '../../actions/personal/token'
import Presenter from './presenter'
import * as states from '../../constants/APIStatuses'

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state

  let loggedIn = (personal.login && personal.login.token) ? true : false
  let balance = (personal.user && personal.user.balance && personal.user.balance < 0) ? '-$' + Math.abs(personal.user.balance) : null

  return {
    preview: (new URLSearchParams(ownProps.location.search)).get('preview') === 'true',
    loggedIn: loggedIn,
    redirectUrl: personal.login.redirectUrl,
    balance: balance,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
