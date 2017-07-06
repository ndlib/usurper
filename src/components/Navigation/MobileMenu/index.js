import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const MobileMenu = (props) => {
  if (props.open) {
    return (
      <ul className='topnav' id='topNav'>
        <li><Link to='/research/'>Research</Link></li>
        <li><Link to='/services/'>Services</Link></li>
        <li><Link to='/libraries/'>Libraries &amp; Centers</Link></li>
        <li><Link to='/about/'>About</Link></li>
        <li><Link to='/personal'>My Account</Link></li>
        <li><Link to='/hours'>Hours</Link></li>
      </ul>
    )
  }
  return null
}

export default MobileMenu
