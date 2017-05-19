import React from 'react'
import PropTypes from 'prop-types'

const ServicesMenu = (props) => {
  if (props.open) {
    return (<div className='menu-drawer'>Services menu</div>)
  }
  return null
}

ServicesMenu.propTypes = {
  open: PropTypes.bool,
}

ServicesMenu.defatultProps = {
  open: false,
}

export default ServicesMenu
