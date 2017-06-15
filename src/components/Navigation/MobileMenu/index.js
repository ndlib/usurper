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
        <li><Link to='/contact-quick-guide/'>Ask Us</Link></li>
      </ul>
    )
  }
  return null
}

export default MobileMenu
