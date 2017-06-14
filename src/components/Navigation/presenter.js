import React from 'react'
import PropTypes from 'prop-types'
import DropDown from './DropDown'
import AskMenu from './AskMenu'
import Link from '../Link'
import { ASK_MENU } from '../../actions/menu'

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
        <div className="menu-icon">
          <a href="javascript:void(0);" class="icon" onclick="menu()">☰</a>
          <ul className="topnav" id="topNav">
            <li><a href="/research/">Research</a></li>
            <li><a href="/services/">Services</a></li>
            <li><a href="/libraries/">Libraries &amp; Centers</a></li>
            <li><a href="/about/">About</a></li>
            <li><a href="/page/contact-quick-guide/">Ask Us</a></li>
          </ul>
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
