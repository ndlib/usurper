import React from 'react'
import PropTypes from 'prop-types'
import Link from '../Link'
import Config from '../../shared/Configuration'

const ServiceNowLink = ({ children, isWebContent }) => {
  let url = `${Config.serviceNowBaseURL}&URL=${window.location}`
  if (isWebContent) {
    url += '&lib_list_problem=lib_list_web_content'
  }
  return (
    <Link to={url}>
      {children}
    </Link>
  )
}

ServiceNowLink.propTypes = {
  children: PropTypes.object,
  isWebContent: PropTypes.boolean,
}

export default ServiceNowLink
