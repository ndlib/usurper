import React, { Component } from 'react'
import { connect } from 'react-redux'
import getToken from '../../actions/personal/token'
import LoginStatus from './presenter'
import * as states from '../../constants/APIStatuses'

class Login extends Component {
  componentWillMount () {
    if (!this.props.login) {
      this.props.dispatch(getToken())
    }
  }

  render () {
    return <LoginStatus {...this.props} />
  }
}

const mapStateToProps = (state) => {
  const { personal } = state

  let loggedIn = personal.login && personal.login.state === states.SUCCESS
  let label = loggedIn ? 'My Account' : 'Log In'

  return {
    login: personal.login,
    loggedIn: loggedIn,
    label: label,

    buttonUrl: personal.login ? personal.login.buttonUrl : '',
    // This "service = window.location" is to redirect back to this location after logging out
      // It will only work if you're on a site https://*.library.nd.edu (eg. alpha) because OIT CAS is very strict
    logoutUrl: personal.login ? personal.login.logoutUrl : null,
  }
}

export default connect(mapStateToProps)(Login)
