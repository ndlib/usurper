import React from 'react'
import PropTypes from 'prop-types'
import { matchPath } from 'react-router'
import Link from 'components/Interactive/Link'

const ButtonUserMenu = (props) => {
  return (
    <nav className='account-menu-buttons' aria-labelledby='main-page-title'>
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
    </nav>
  )
}

ButtonUserMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

export default ButtonUserMenu
