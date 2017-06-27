import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import getToken from '../../../actions/personal/token'
import Presenter from './presenter'
import * as states from '../../../constants/APIStatuses'

import Config from '../../../shared/Configuration'
import { USER_MENU } from '../../../actions/menu'

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

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state
  let loggedIn = (personal.login && personal.login.token) ? true : false

  return {
    login: personal.login,
    open: state.menus.menuId === USER_MENU,
    logoutUrl: loggedIn ? Config.viceroyAPI + '/logout' : null,
    location: window.location.origin + ownProps.location.pathname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
