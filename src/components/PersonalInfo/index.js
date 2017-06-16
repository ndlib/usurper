import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getToken from '../../actions/personal/token'
import Presenter from './presenter'
import * as states from '../../constants/APIStatuses'

export const mapStateToProps = (state) => {
  const { personal } = state

  let loggedIn = (personal.login && personal.login.token) ? true : false

  return {
    loggedIn: loggedIn,
    redirectUrl: personal.login.redirectUrl,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Presenter)
