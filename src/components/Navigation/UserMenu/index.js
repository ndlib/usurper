'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const UserMenu = (props) => {
  if (props.open) {
    return (
      <div className={props.open ? 'menu-drawer visible' : 'menu-drawer'}>
        <div className='container-fluid row'>
          <ul className='child'>
            <li><Link to='/personal'>Items &amp; Requests</Link></li>
            <li><Link to='/courses'>Courses</Link></li>
            <li><Link to='/#'>Log Out</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  return null
}
UserMenu.propTypes = {
  open: PropTypes.bool,
}

UserMenu.defaultProps = {
  open: false,
}
export default UserMenu
