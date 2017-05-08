'use strict'
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import style from '../../static/css/global.css'

class Navigation extends Component {
  render () {
    return (
      <nav>
        <div className='container-fluid'>
          <div className='menu-link'><NavLink to='/'>Home</NavLink></div>
          <div className='menu-link'><NavLink to='/research'>Research</NavLink></div>
          <div className='menu-link'><NavLink to='/services/'>Services</NavLink></div>
          <div className='menu-link'><NavLink to='/libraries/'>Libraries & Centers</NavLink></div>
          <div className='menu-link'><NavLink to='/about/'>About</NavLink></div>
          <div className='menu-link ask'>
            <NavLink to='/get-help/' className='right m'>Ask Us</NavLink>
          </div>
          <div className='menu-link search'>
            <NavLink to='http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?vid=NDU' className='right search' id='header-search-button' >Search</NavLink>
          </div>
        </div>

      </nav>
    )
  }
}

export default Navigation
