import React from 'react'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router'
import Link from '../../Link'

const UserMenu = (props) => {
  if (props.format === 'buttons') {
    const subheading = props.subheading ? (
      <React.Fragment>
        <h2>{props.subheading}</h2>
        <hr aria-hidden='true' />
      </React.Fragment>
    ) : null

    return (
      <React.Fragment>
        <nav className='account-menu' aria-labelledby='main-page-title'>
          { props.links.map((link) => {
            const current = !!matchPath(props.location.pathname, link.route)
            return (
              <Link
                to={link.route}
                className={'button tab margin-right-15' + (current ? ' current' : '')}
                key={link.key}
                aria-current={current ? 'page' : null}
              >
                {link.key}
              </Link>
            )
          })}
          <Link
            to={props.logoutUrl}
            className='logout button tab margin-right-15'
            query={{ service: props.location.origin }}
            noTarget
            hideIfNull
          >Log Out</Link>
        </nav>
        {subheading}
      </React.Fragment>
    )
  } else {
    if (!props.open) {
      return null
    }

    return (
      <div className={props.open ? 'menu-drawer visible' : 'menu-drawer'} id='my-account-menu'>
        <div className='container-fluid row'>
          <ul className='child'>
            { props.links.map((link) => {
              return <li key={link.key}><Link to={link.route}>{link.key}</Link></li>
            })}
            <li>
              <Link
                to={props.logoutUrl}
                // This "service = location" is to redirect back to this location after logging out
                // It will only work if you are on a site https://*.library.nd.edu because OIT CAS is very strict
                query={{ service: props.location.origin }}
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
}
UserMenu.propTypes = {
  open: PropTypes.bool,
  logoutUrl: PropTypes.string,
  location: PropTypes.object,
  format: PropTypes.string,
  subheading: PropTypes.string,
  links: PropTypes.array,
}

UserMenu.defaultProps = {
  open: false,
  format: 'dropdown',
}
export default UserMenu
