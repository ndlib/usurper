import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Presenter from './presenter'

import { USER_MENU } from 'actions/menu'

import Config from 'shared/Configuration'

const UserMenuContainer = (props) => {
  const links = [
    { key: 'Items & Requests', route: '/items-requests' },
    { key: 'Courses', route: '/courses' },
    { key: 'Checkout History', route: '/checkout-history' },
  ]

  if (Config.features.favoritesEnabled) {
    links.splice(3, 0, { key: 'Favorites', route: '/favorites' })
  }

  return <Presenter links={links} {...props} />
}

export const mapStateToProps = (state) => {
  const { menus } = state

  return {
    open: menus.menuId === USER_MENU,
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
