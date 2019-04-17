import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import getToken from '../../../../actions/personal/token'
import Presenter from './presenter'

import Config from 'shared/Configuration'
import { USER_MENU } from '../../../../actions/menu'

class Login extends Component {
  componentWillMount () {
    if (!this.props.login) {
      this.props.getToken()
    }
  }

  render () {
    const links = [
      { key: 'Items & Requests', route: '/items-requests' },
      { key: 'Courses', route: '/courses' },
      { key: 'Checkout History', route: '/checkout-history' },
      { key: 'Settings', route: '/settings' },
    ]

    return <Presenter links={links} {...this.props} />
  }
}

Login.propTypes = {
  login: PropTypes.object,
  getToken: PropTypes.func,
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = !!(personal.login && personal.login.token)

  return {
    login: personal.login,
    open: state.menus.menuId === USER_MENU,
    logoutUrl: loggedIn ? Config.viceroyAPI + '/logout' : null,
    location: window.location,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
