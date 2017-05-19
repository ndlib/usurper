import React from 'react'
import PropTypes from 'prop-types'

const ResearchMenu = (props) => {
  if (props.open) {
    return (<div className='menu-drawer'>Research menu</div>)
  }
  return null
}

ResearchMenu.propTypes = {
  open: PropTypes.bool,
}

ResearchMenu.defatultProps = {
  open: false,
}

export default ResearchMenu
