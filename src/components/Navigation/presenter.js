import React from 'react'
import PropTypes from 'prop-types'

import ResearchMenu from './ResearchMenu'
import ServicesMenu from './ServicesMenu'
import LibrariesMenu from './LibrariesMenu'
import AboutMenu from './AboutMenu'
import AskMenu from './AskMenu'
import Link from '../Link'

import {
  RESEARCH_MENU,
  SERVICES_MENU,
  LIBRARIES_MENU,
  ABOUT_MENU,
  ASK_MENU,
} from '../../actions/menu'

import '../../static/css/global.css'

const Navigation = (props) => {
  if (props.menus) {
    return (
      <nav className='uNavigation'>
        <div className='container-fluid'>
          <div className='menu-link'>
            <Link to='/'>Home</Link>
          </div>
          <div className='menu-link'
            onClick={props.handleResearchClick}>
            <a>Research</a>
            <ResearchMenu open={props.menus.menuId === RESEARCH_MENU} />
          </div>
          <div className='menu-link'
            onClick={props.handleServicesClick}>
            <a>Services</a>
            <ServicesMenu open={props.menus.menuId === SERVICES_MENU} />
          </div>
          <div className='menu-link'
            onClick={props.handleLibrariesClick}>
            <a>Libraries & Centers</a>
            <LibrariesMenu open={props.menus.menuId === LIBRARIES_MENU} />
          </div>
          <div className='menu-link'
            onClick={props.handleAboutClick}>
            <a>About</a>
            <AboutMenu open={props.menus.menuId === ABOUT_MENU} />
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
        </div>
      </nav>
    )
  }
  return null
}

Navigation.propTypes = {
  menus: PropTypes.object.isRequired,
  handleDrawerClick: PropTypes.func.isRequired,
  handleAskClick: PropTypes.func.isRequired,
  handleAboutClick: PropTypes.func.isRequired,
  handleLibrariesClick: PropTypes.func.isRequired,
  handleResearchClick: PropTypes.func.isRequired,
  handleServicesClick: PropTypes.func.isRequired,
}
export default Navigation
