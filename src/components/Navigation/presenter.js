import React from 'react'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import AskMenu from './AskMenu'
import MobileMenu from './MobileMenu'
import Link from '../Link'
import { ASK_MENU, MOBILE_MENU } from '../../actions/menu'

const Navigation = (props) => {
  const dropDowns = props.dropDowns.map((menu, index) => {
    return (
      <div className='menu-link'
        onClick={menu.onClick}
        key={index}>
        <a>{menu.title}</a>
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
          <a className='right m' href='/hours/'>Hours</a>
        </div>
        <div className='menu-link ask' onClick={props.handleAskClick}>
          <a className='right m'>Ask Us</a>
          <AskMenu open={props.menus.menuId === ASK_MENU} />
        </div>
        <div className='menu-link search'>
          <a
            className='right search'
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
}
export default Navigation
