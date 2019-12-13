import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Link from 'components/Interactive/Link'

const LogoutLink = (props) => {
  const classes = 'logout ' + (props.className || '')
  if (!props.loggedIn) {
    return null
  }
  return (
    <Link
      to='#'
      className={classes}
      noTarget
      onClick={() => {
        // remove the jwt login information in session storage
        sessionStorage.removeItem('libraryWebsite')
        // redirect to homepage since user likely on page requiring login
        window.location.replace('/')
      }}
    >{props.buttonText}</Link>
  )
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = !!(personal.login && personal.login.token)

  return {
    loggedIn: loggedIn,
    location: window.location,
  }
}

LogoutLink.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
  loggedIn: PropTypes.bool,
  location: PropTypes.shape({
    origin: PropTypes.string,
  }),
}

LogoutLink.defaultProps = {
  buttonText: 'Log Out',
}

export default connect(mapStateToProps)(LogoutLink)
