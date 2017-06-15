import React from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import Link from '../Link'

const LoginStatus = (props) => {
  return (
    <div key='log-in-out' className='log-in-out'>
      <Link to={props.buttonUrl}
        className={props.loggedIn ? 'login' : 'login logged-in'}
        noTarget
      >
        {props.label}
      </Link>
      <Link
        to={props.logoutUrl}
        query={{ service: window.location.href }}
        className='logout'
        noTarget
        hideIfNull
      >
        Log Out
      </Link>
    </div>
  )
}

LoginStatus.propTypes = {
  loggedIn: PropTypes.bool,
  label: PropTypes.string,

  buttonUrl: PropTypes.string,
  logoutUrl: PropTypes.string,
}

export default LoginStatus
