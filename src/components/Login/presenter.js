import React, { Component } from 'react'
import PropTypes from 'prop-types'
import '../../static/css/global.css'
import Link from '../Link'

class LoginStatus extends Component {
  componentWillMount () {
    this.props.getInfo()
  }

  render () {
    var loggedIn = !!this.props.token
    var label = 'Log In'
    if (loggedIn) {
      label = 'My Account'
    }
    return (
      <div key='log-in-out' className='log-in-out'>
        <Link to={this.props.buttonUrl} className={loggedIn
            ? 'login' : 'login logged-in'}>
          {label}
        </Link>
        <Link
          to={this.props.logoutUrl}
          query={{ service: window.location.href }}
          className='logout'
          hideIfNull={true}
        >
          Log Out
        </Link>
      </div>
    )
  }
}

LoginStatus.propTypes = {
  token: PropTypes.string,
  netid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  displayName: PropTypes.string,

  buttonUrl: PropTypes.string,
  logoutUrl: PropTypes.string,

  getInfo: PropTypes.func
}

export default LoginStatus
