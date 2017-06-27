import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const Menu = (props) => {
  return (
    <div className={props.open ? 'menu-drawer visible' : 'menu-drawer'}>
      <div className='container-fluid row'>
        {props.children}
      </div>
      <div className='container-fluid row'>
        <div className='col-md-offset-2 col-md-8'>
          <Link to={props.landingPage} className='more' hideIfNull>More {props.title} </Link>
        </div>
      </div>
    </div>
  )
}

Menu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.element,
  ]),
  title: PropTypes.string.isRequired,
  landingPage: PropTypes.string,
  open: PropTypes.bool.isRequired,
}

export default Menu
