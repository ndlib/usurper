import React from 'react'
import PropTypes from 'prop-types'

const LibrariesMenu = (props) => {
  if (props.open) {
    return (<div className='menu-drawer'>Libraries menu</div>)
  }
  return null
}

LibrariesMenu.propTypes = {
  open: PropTypes.bool,
}

LibrariesMenu.defatultProps = {
  open: false,
}

export default LibrariesMenu
