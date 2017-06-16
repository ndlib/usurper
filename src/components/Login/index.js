import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getToken from '../../actions/personal/token'
import Presenter from './presenter'
import * as states from '../../constants/APIStatuses'

import Config from '../../shared/Configuration'

class Login extends Component {
  componentWillMount () {
    if (!this.props.login) {
      this.props.getToken()
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { personal } = state
  let loggedIn = (personal.login && personal.login.token) ? true : false
  let label = loggedIn ? 'My Account' : 'Log In'

  return {
    login: personal.login,
    loggedIn: loggedIn,
    label: label,

    // This "service = window.location" is to redirect back to this location after logging out
      // It will only work if you're on a site https://*.library.nd.edu (eg. alpha) because OIT CAS is very strict
    logoutUrl: loggedIn ? Config.viceroyAPI + '/logout' : null,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
