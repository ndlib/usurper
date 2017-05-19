import React from 'react'
import PropTypes from 'prop-types'

const AboutMenu = (props) => {
  if (props.open) {
    return (<div className='menu-drawer'>About menu</div>)
  }
  return null
}

AboutMenu.propTypes = {
  open: PropTypes.bool,
}

AboutMenu.defatultProps = {
  open: false,
}

export default AboutMenu
