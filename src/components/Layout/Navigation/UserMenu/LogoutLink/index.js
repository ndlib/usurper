import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'

const LogoutLink = (props) => {
  const classes = 'logout ' + (props.className || '')

  return (
    <Link
      to={props.logoutUrl}
      className={classes}
      // This "service = location" is to redirect back to this location after logging out
      // It will only work if you are on a site https://*.library.nd.edu because OIT CAS is very strict
      query={{ service: props.location.origin }}
      noTarget
      hideIfNull
    >{props.buttonText}</Link>
  )
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = !!(personal.login && personal.login.token)

  return {
    logoutUrl: loggedIn ? Config.viceroyAPI + '/logout' : null,
    location: window.location,
  }
}

LogoutLink.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  logoutUrl: PropTypes.string,
  location: PropTypes.shape({
    origin: PropTypes.string,
  }),
}

LogoutLink.defaultProps = {
  buttonText: 'Log Out',
}

export default connect(mapStateToProps)(LogoutLink)
