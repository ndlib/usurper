import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

function Internal (to, className, alt, children) {
  return (
    <Link to={to} className={className} alt={alt}>
      {children}
    </Link>
  )
}

function External (to, className, alt, children) {
  return (
    <a href={to} className={className} alt={alt}>
      {children}
    </a>
  )
}

function Invalid (className, children) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

function LibLink (props) {
  let to = props.to

  if (!to) {
    return Invalid(props.className, props.children)
  }

  if (to.startsWith('http')) {
    return External(to, props.className, props.alt, props.children)
  }

  return Internal(to, props.className, props.alt, props.children)
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  children: PropTypes.any
}

export default LibLink
