import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Menu = (props) => {
  return (
    <div className='menu-drawer'>
      <div className='container-fluid row'>
        {props.children}
      </div>
      <div className='container-fluid row'>
        <div className='col-md-offset-10 col-md-2'>
          <Link to={props.landingPage}>All {props.title}</Link>
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
  landingPage: PropTypes.string.isRequired,
}

export default Menu
