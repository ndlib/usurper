import React from 'react'
import PropTypes from 'prop-types'
import ButtonUserMenu from './ButtonUserMenu'
import DropdownUserMenu from './DropdownUserMenu'
import MobileUserMenu from './MobileUserMenu'

const UserMenu = (props) => {
  if (props.format === 'buttons') {
    return (
      <React.Fragment>
        <ButtonUserMenu {...props} />
        { props.subheading && (
          <React.Fragment>
            <h2>{props.subheading}</h2>
            <hr aria-hidden='true' />
          </React.Fragment>
        )}
      </React.Fragment>
    )
  } else if (props.format === 'mobile') {
    return <MobileUserMenu {...props} />
  } else if (props.format === 'dropdown') {
    return <DropdownUserMenu {...props} />
  }
}
UserMenu.propTypes = {
  format: PropTypes.oneOf(['buttons', 'mobile', 'dropdown']).isRequired,
  subheading: PropTypes.string,
}

UserMenu.defaultProps = {
  format: 'dropdown',
}

export default UserMenu
