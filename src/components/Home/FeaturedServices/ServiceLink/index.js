import React from 'react'
import PropTypes from 'prop-types'

import Link from 'components/Interactive/Link'

import './style.css'

const ServiceLink = ({ url, title, icon, alt }) => {
  return (
    <div className='featured-service'>
      <Link to={url} title={title} className='featured-service-link'>
        <img src={icon} alt={alt || ''} aria-hidden='true' className='featured-service-image' />
        <span className='featured-service-title'>{title}</span>
      </Link>
    </div>
  )
}

ServiceLink.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  alt: PropTypes.string,
}

export default ServiceLink
