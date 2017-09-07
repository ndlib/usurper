import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react'
import PropTypes from 'prop-types'

export const LINK_CLICK = 'LINK_CLICK'

const Internal = (to, onClick, ariaLabel, props) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {props.children}
    </Link>
  )
}

const External = (to, noTarget, onClick, ariaLabel, props) => {
  let target = noTarget ? '_self' : '_blank'
  let rel = noTarget ? '' : 'noopener'
  return (
    <a href={to}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {props.children}
    </a>
  )
}

const Invalid = (props) => {
  return (
    <span className={props.className}>
      {props.children}
    </span>
  )
}

const Hidden = (
  null
)

export const LibLink = (props) => {
  let query = ''
  for (let k in props.query) {
    if (props.query.hasOwnProperty(k)) {
      if (query.length > 0) {
        query += '&'
      } else {
        query = '?'
      }
      query += k + '=' + props.query[k]
    }
  }

  let propsToPass = Object.assign({}, props)
  for (let k in nonTagProps) {
    delete propsToPass[k]
  }

  let to = props.to
  if (!to) {
    if (props.hideIfNull) {
      return Hidden
    }
    return Invalid(propsToPass)
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

  for (let index in replaceUrls) {
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
    return External(to, props.noTarget, onClick, props.ariaLabel, propsToPass)
  }

  if (to.startsWith('mailto:') || to.startsWith('tel:')) {
    return External(to, false, onClick, props.ariaLabel, propsToPass)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, true, onClick, props.ariaLabel, propsToPass)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, true, undefined, props.ariaLabel, propsToPass)
  }

  // Ensure internal links start with '/'
  if (!to.startsWith('/')) {
    to = '/' + to
  }
  return Internal(to, onClick, props.ariaLabel, propsToPass)
}

const nonTagProps = {
  to: PropTypes.string,
  query: PropTypes.object,
  noTarget: PropTypes.bool,
  hideIfNull: PropTypes.bool,
  ariaLabel: PropTypes.string,

  location: PropTypes.object,
  match: PropTypes.object,
  rel: PropTypes.string,
  dispatch: PropTypes.func,
  staticContext: PropTypes.any,
  history: PropTypes.object,
}

LibLink.propTypes = Object.assign({}, nonTagProps, {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  itemProp: PropTypes.string,
})

export default withRouter(connect()(LibLink))
