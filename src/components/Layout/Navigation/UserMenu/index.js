import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Presenter from './presenter'

import Config from 'shared/Configuration'
import { USER_MENU } from 'actions/menu'

const UserMenuContainer = (props) => {
  const links = [
    { key: 'Items & Requests', route: '/items-requests' },
    { key: 'Courses', route: '/courses' },
    { key: 'Checkout History', route: '/checkout-history' },
    { key: 'Settings', route: '/settings' },
  ]

  return <Presenter links={links} {...props} />
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = !!(personal.login && personal.login.token)

  return {
    open: state.menus.menuId === USER_MENU,
    logoutUrl: loggedIn ? Config.viceroyAPI + '/logout' : null,
    location: window.location,
  }
}

UserMenuContainer.propTypes = {
  open: PropTypes.bool,
  logoutUrl: PropTypes.string,
  location: PropTypes.object,
  format: PropTypes.string,
}

export default connect(mapStateToProps)(UserMenuContainer)
