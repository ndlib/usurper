import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react'
import PropTypes from 'prop-types'

export const LINK_CLICK = 'LINK_CLICK'

const Internal = (to, className, title, children, ariaLabel, onClick) => {
  return (
    <Link to={to} className={className} title={title} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </Link>
  )
}

const External = (to, className, title, children, ariaLabel, noTarget, onClick) => {
  let target = noTarget ? '_self' : '_blank'
  let rel = noTarget ? '' : 'noopener'
  return (
    <a href={to}
      className={className}
      title={title}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

const Invalid = (className, children) => {
  return (
    <span className={className}>
      {children}
    </span>
  )
}

const Hidden = (
  null
)

export const LibLink = (props) => {
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

    // Urls to remove so links are local
  let replaceUrls = [
    'https://alpha.library.nd.edu',
    'http://alpha.library.nd.edu',
    'https://beta.library.nd.edu',
    'http://beta.library.nd.edu',
    'https://library.nd.edu',
    'http://library.nd.edu',
  ]

  for (var index in replaceUrls) {
    if (to.startsWith(replaceUrls[index])) {
      to = to.substr(replaceUrls[index].length)
      break
    }
  }

  // post click event for analytics on all links
  const onClick = () => {
    props.dispatch({
      type: LINK_CLICK,
      from: props.location.pathname,
      to: to,
      query: query,
    })
    return true
  }

  to = to + query

  if (to.startsWith('http')) {
    return External(to, props.className, props.title, props.children, props.ariaLabel, props.noTarget, onClick)
  }

  if (to.startsWith('mailto:') || to.startsWith('tel:')) {
    return External(to, props.className, props.title, props.children, props.ariaLabel, false, onClick)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, props.className, props.title, props.children, props.ariaLabel, true, onClick)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, props.className, props.title, props.children, props.ariaLabel, true)
  }

  // Ensure internal links start with '/'
  if (!to.startsWith('/')) {
    to = '/' + to
  }
  return Internal(to, props.className, props.title, props.children, props.ariaLabel, onClick)
}

LibLink.propTypes = {
  to: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  query: PropTypes.object,
  children: PropTypes.any,

  noTarget: PropTypes.bool,
  hideIfNull: PropTypes.bool,
}

export default withRouter(connect()(LibLink))
