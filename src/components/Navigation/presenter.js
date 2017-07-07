import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import AskMenu from './AskMenu'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'
import Link from '../Link'
import { ASK_MENU, MOBILE_MENU } from '../../actions/menu'

const myAccountButton = (props) => {
  if (props.loggedIn) {
    return (
      <div
        className='menu-link user'
        onClick={props.handleUserClick}
        onKeyDown={props.handleUserKeyDown}
        tabIndex='0'>
        <a className='m'>My Account</a>
        <Route component={UserMenu} />
      </div>
    )
  } else {
    return (
      <div className='menu-link user'>
        <a href={props.loginUrl} className='m'>Login</a>
        <Route component={UserMenu} />
      </div>
    )
  }
}
const Navigation = (props) => {
  const dropDowns = props.dropDowns.map((menu, index) => {
    return (
      <div className='menu-link'
        onClick={menu.onClick}
        onKeyDown={menu.keyDown}
        key={index}
        tabIndex='0'>
        <a id={menu.title.toLowerCase()}>{menu.title}</a>
        <DropDown
          title={menu.title}
          landingPage={menu.landingPage}
          open={props.menus.menuId === menu.menuId}
          menuData={menu.menuData}
          />
      </div>
    )
  })

  return (
    <div className='uNavigation'>
      <nav className='container-fluid menu-list' aria-label='Main Navigtion'>
        <div className='menu-link'>
          <Link to='/'>Home</Link>
        </div>
        {dropDowns}
        <div className='right'>
          <div className='menu-link search'>
            <a
              className={'search ' + props.toggleClass}
              id='header-search-button'
              onClick={props.handleDrawer}
              onKeyDown={props.handleDrawer}
              tabIndex='0'
              aria-expanded={props.isDrawerOpen}
              aria-controls='drawer'
              aria-label='Search Drawer'
              >Search</a>
          </div>
          { myAccountButton(props) }
          <div className='menu-link hours-m'>
            <Link to='/hours' className='m'>Hours</Link>
          </div>
        </div>
        <div className='menu-icon'>
          <a onClick={props.handleMobileClick}>☰</a>
          <MobileMenu open={props.menus.menuId === MOBILE_MENU} />
        </div>
      </nav>
    </div>
  )
}

Navigation.propTypes = {
  menus: PropTypes.object.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  handleAskClick: PropTypes.func.isRequired,
  dropDowns: PropTypes.array.isRequired,

  toggleClass: PropTypes.string.isRequired,
}
export default Navigation
