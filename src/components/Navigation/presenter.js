import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import UserMenu from './UserMenu'
import MobileMenu from './MobileMenu'
import Link from '../Link'
import { USER_MENU, MOBILE_MENU } from '../../actions/menu'

const myAccountButton = (props) => {
  if (props.loggedIn) {
    return (
      <li className='menu-link user right'>
        <a
          onClick={props.handleUserClick}
          onKeyDown={props.handleUserKeyDown}
          tabIndex='0'
          aria-haspopup='true'
          aria-owns='my-account-menu'
          aria-controls='my-account-menu'
          aria-expanded={props.menus.menuId === USER_MENU}
          className='m'>My Account</a>
        <Route component={UserMenu} />
      </li>
    )
  } else {
    return (
      <li className='menu-link user right'>
        <a href={props.loginUrl} className='m'>Login</a>
        <Route component={UserMenu} />
      </li>
    )
  }
}
const Navigation = (props) => {
  const dropDowns = props.dropDowns.map((menu, index) => {
    return (
      <li className='menu-link' key={index}>
        <a
          id={menu.title.toLowerCase()}
          onClick={menu.onClick}
          onKeyDown={menu.keyDown}
          aria-label={menu.title}
          aria-haspopup='true'
          aria-owns={menu.id}
          aria-controls={menu.id}
          aria-expanded={props.menus.menuId === menu.menuId}
          tabIndex='0'
          href='#'
        >{menu.title}</a>
        <DropDown
          title={menu.title}
          landingPage={menu.landingPage}
          open={props.menus.menuId === menu.menuId}
          menuData={menu.menuData}
          id={menu.menuId}
        />
      </li>
    )
  })

  const windowWidth = window.innerWidth
  const mobileWidth = 980

  return (
    <div className='uNavigation'>
      <nav
        className='container-fluid'
        role='navigation'
        aria-label='Main'>
        <ul className='menu-list'>
          <li className='menu-link'><Link to='/'>Home</Link></li>
          {dropDowns}
          <li className='menu-link hours-m right'>
            <Link to='/hours' className='m'>Hours</Link>
          </li>
          { myAccountButton(props) }
          <li className='right menu-link search'>
            <a
              className={'search ' + props.toggleClass}
              id='header-search-button'
              onClick={props.handleDrawer}
              onKeyDown={props.handleDrawer}
              tabIndex={windowWidth > mobileWidth ? '0' : '-1'}
              aria-expanded={props.isDrawerOpen}
              aria-controls='drawer'
              aria-label={props.isDrawerOpen ? 'Close Search Drawer' : 'Open Search Drawer'}
            >Search</a>
          </li>
          <MobileMenu
            open={props.menus.menuId === MOBILE_MENU}
            loggedIn={props.loggedIn}
            visible={windowWidth <= mobileWidth}
            onClick={props.handleMobileClick}
            onKeyDown={props.handleMobileMenuKeyDown}
          />
        </ul>
      </nav>
    </div>
  )
}

Navigation.propTypes = {
  menus: PropTypes.object.isRequired,
  handleDrawer: PropTypes.func.isRequired,
  dropDowns: PropTypes.array.isRequired,
  toggleClass: PropTypes.string.isRequired,
  handleMobileMenuKeyDown: PropTypes.func.isRequired,
  handleMobileClick: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool,
  isDrawerOpen: PropTypes.bool.isRequired,
}
export default Navigation
