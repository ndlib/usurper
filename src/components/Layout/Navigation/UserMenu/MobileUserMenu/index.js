import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'

const MobileUserMenu = (props) => {
  return (
    <li>
      <Link to='/items-requests'>My Account</Link>
      <ul>
        { props.links.map((link) => {
          return (
            <li key={link.key}>
              <Link to={link.route}>{link.key}</Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

MobileUserMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })),
}

export default MobileUserMenu
