import { Link } from 'react-router-dom'
import React from 'react'
import PropTypes from 'prop-types'

const Internal = (to, className, title, children) => {
  return (
    <Link to={to} className={className} title={title}>
      {children}
    </Link>
  )
}

const External = (to, className, title, children, noTarget) => {
  let target = noTarget ? '_self' : '_blank'
  return (
    <a href={to} className={className} title={title} target={target}>
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
    return External(to, props.className, props.title, props.children, props.noTarget)
  }

  if (to.startsWith('mailto:') || to.startsWith('tel:')) {
    return External(to, props.className, props.title, props.children, false)
  }

  return Internal(to, props.className, props.title, props.children)
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  query: PropTypes.object,
  children: PropTypes.any,

  noTarget: PropTypes.bool,
  hideIfNull: PropTypes.bool,
}

export default LibLink
