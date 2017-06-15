import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const Internal = (to, className, alt, children) => {
  return (
    <Link to={to} className={className} alt={alt}>
      {children}
    </Link>
  )
}

const External = (to, className, alt, children, noTarget) => {
  let target = noTarget ? '_self' : '_blank'
  return (
    <a href={to} className={className} alt={alt} target={target}>
      {children}
    </a>
  )
}

const Invalid = (className, children) => {
  return (
    <div className={className}>
      {children}
    </div>
  )
}

const Hidden = (
  null
)

const LibLink = (props) => {
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
    return External(to, props.className, props.alt, props.children, props.noTarget)
  }

  return Internal(to, props.className, props.alt, props.children)
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  alt: PropTypes.string,
  query: PropTypes.object,
  children: PropTypes.any,

  noTarget: PropTypes.bool,
  hideIfNull: PropTypes.bool,
}

export default LibLink
