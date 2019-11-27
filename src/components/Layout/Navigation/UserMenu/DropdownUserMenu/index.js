import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'

const DropdownUserMenu = (props) => {
  if (!props.open) {
    return null
  }

  return (
    <div className={props.open ? 'menu-drawer visible' : 'menu-drawer'} id='my-account-menu'>
      <div className='container-fluid row'>
        <ul className='child'>
          { props.links.map((link) => {
            return (
              <li key={link.key}>
                <Link to={link.route}>{link.key}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

DropdownUserMenu.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    route: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
  })),
  open: PropTypes.bool,
}

export default DropdownUserMenu
