import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import Link from '../../Link'

const Presenter = (props) => {
  return (
    <Link to={props.buttonUrl} noTarget>
      {props.children}
    </Link>
  )
}

Presenter.propTypes = {
  children: PropTypes.object,

  buttonUrl: PropTypes.string,
}

export default Presenter
