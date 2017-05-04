import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Config from '../../shared/Configuration'

const logoutUrl = Config.viceroyAPI + '/logout'

class LoginStatus extends Component {
  componentWillMount () {
    this.onClick = this.onClick.bind(this)
    this.props.getInfo(false)
  }

  componentWillUpdate () {
    this.props.getInfo(false)
  }

  onClick () {
    if (this.props.getInfo()) {
      this.context.router.push('/personal')
    }
  }

  render () {
    var loggedIn = !!this.props.token
    var label = 'Log In'
    var logout = null
    if (loggedIn) {
      label = 'My Account'
      // This "service = window.location" is to redirect back to this location after logging out
      // It will only work if you're on a site https://*.library.nd.edu (eg. alpha) because OIT CAS is very strict
      logout = <a href={logoutUrl + '?service=' + window.location.href} className='logout'>Log Out</a>
    }
    return (
      <div key='log-in-out' className='log-in-out'>
        <div key='loginStatus'
          onClick={this.onClick}
          className={loggedIn
            ? 'login' : 'login logged-in'}
        >
          {label}
        </div>
        {logout}
      </div>
    )
  }
}

LoginStatus.propTypes = {
  token: PropTypes.string,
  netid: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  displayName: PropTypes.string
}

LoginStatus.contextTypes = {
  router: PropTypes.object
}

export default LoginStatus
