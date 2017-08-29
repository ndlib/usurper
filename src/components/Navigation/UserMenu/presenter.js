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
            <li><Link to='/items-requests'>Items &amp; Requests</Link></li>
            <li><Link to='/courses'>Courses</Link></li>
            <li><Link to='/settings'>Settings</Link></li>
            <li>
              <Link
                to={props.logoutUrl}
                // This "service = location" is to redirect back to this location after logging out
                // It will only work if you're on a site https://*.library.nd.edu because OIT CAS is very strict
                query={{ service: props.location }}
                className='logout'
                noTarget
                hideIfNull
              >Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
  return null
}
UserMenu.propTypes = {
  open: PropTypes.bool,
  logoutUrl: PropTypes.string,
  location: PropTypes.string,
}

UserMenu.defaultProps = {
  open: false,
}
export default UserMenu
