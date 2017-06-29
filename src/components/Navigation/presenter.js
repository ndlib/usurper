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
      <div className='menu-link user' onClick={props.handleUserClick}>
        <a className='right m'>My Account</a>
        <Route component={UserMenu} />
      </div>
    )
  } else {
    return (
      <div className='menu-link user'>
        <a href={props.loginUrl} className='right m'>Login</a>
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
    <nav className='uNavigation'>
      <div className='container-fluid menu-list'>
        <div className='menu-link'>
          <Link to='/'>Home</Link>
        </div>
        {dropDowns}

        <div className='menu-link hours-m'>
          <Link to='/hours' className='right m'>Hours</Link>
        </div>
        {/* <div className='menu-link ask' onClick={props.handleAskClick}>
          <a className='right m'>Ask Us</a>
          <AskMenu open={props.menus.menuId === ASK_MENU} />
        </div> */}
        { myAccountButton(props) }
        <div className='menu-link search'>
          <a
            className={'right search ' + props.toggleClass}
            id='header-search-button'
            onClick={props.handleDrawerClick}
            >Search</a>
        </div>
        <div className='menu-icon'>
          <a onClick={props.handleMobileClick}>☰</a>
          <MobileMenu open={props.menus.menuId === MOBILE_MENU} />
        </div>
      </div>
    </nav>
  )
}

Navigation.propTypes = {
  menus: PropTypes.object.isRequired,
  handleDrawerClick: PropTypes.func.isRequired,
  handleAskClick: PropTypes.func.isRequired,
  dropDowns: PropTypes.array.isRequired,

  toggleClass: PropTypes.string.isRequired,
}
export default Navigation
