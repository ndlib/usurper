import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// Include the referring page url without the query string
const SiteInfoLink = ({ children }) => {
  const wl = window.location
  const path = `/site-info?URL=${wl.protocol}//${wl.hostname}${wl.pathname}`
  return (
    <Link to={path}>
      {children}
    </Link>
  )
}
SiteInfoLink.propTypes = {
  children: PropTypes.object.isRequired,
}

export default SiteInfoLink
