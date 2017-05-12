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
    <a href={to} className={className} alt={alt} target="_blank">
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

const Hidden = (
  null
)

function LibLink (props) {
  let query = ''
  for (var k in props.query) {
    if (props.query.hasOwnProperty(k)) {
      if (query.length > 0) {
        query += '&'
      } else {
        query = '?'
      }
      query += k + '=' + props.query[k]
    }
  }

  let to = props.to
  if (!to) {
    if (props.hideIfNull) {
      return Hidden
    }
    return Invalid(props.className, props.children)
  }

  to = to + query

  if (to.startsWith('http')) {
    return External(to, props.className, props.alt, props.children)
  }

  return Internal(to, props.className, props.alt, props.children)
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  query: PropTypes.object,
  children: PropTypes.any,

  hideIfNull: PropTypes.bool,
}

export default LibLink
