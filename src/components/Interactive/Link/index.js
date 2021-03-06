import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import React from 'react'
import PropTypes from 'prop-types'

export const LINK_CLICK = 'LINK_CLICK'

const svgArrow = (
  <svg viewBox='0 0 16 1' preserveAspectRatio='none'>
    <path d='M0,0 0,0 16,0.5 0,1 0,1z' />
    <line x1='0' x2='16' y1='0' y2='0.5' stroke='#a7a7a7' strokeWidth='0.05' strokeLinecap='butt' />
    <line x1='0' x2='16' y1='1' y2='0.5' stroke='#a7a7a7' strokeWidth='0.1' strokeLinecap='butt' />
  </svg>
)

const Internal = (to, onClick, ariaLabel, arrow, props) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {arrow ? (
        <React.Fragment>
          <div>{props.children}</div>
          {svgArrow}
        </React.Fragment>
      ) : (
        props.children
      )}
    </Link>
  )
}

const External = (to, noTarget, onClick, ariaLabel, arrow, props) => {
  const target = noTarget ? '_self' : '_blank'
  const rel = noTarget ? '' : 'noopener noreferrer'
  return (
    <a href={to}
      target={target}
      rel={rel}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {arrow ? (
        <React.Fragment>
          <div>{props.children}</div>
          {svgArrow}
        </React.Fragment>
      ) : (
        props.children
      )}
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
  for (const k in props.query) {
    if (props.query.hasOwnProperty(k)) {
      if (query.length > 0) {
        query += '&'
      } else {
        query = '?'
      }
      query += k + '=' + props.query[k]
    }
  }

  const propsToPass = Object.assign({}, props)
  for (const k in nonTagProps) {
    delete propsToPass[k]
  }
  if (propsToPass.arrow) {
    propsToPass.className = `${propsToPass.className || ''} viewAll`
    delete propsToPass['arrow']
  }

  let to = props.to
  if (!to) {
    if (props.hideIfNull) {
      return Hidden
    }
    return Invalid(propsToPass)
  }

  // Urls to remove so links are local
  const replaceUrls = [
    'https://alpha.library.nd.edu',
    'http://alpha.library.nd.edu',
    'https://beta.library.nd.edu',
    'http://beta.library.nd.edu',
    'https://library.nd.edu',
    'http://library.nd.edu',
    'https://test.library.nd.edu',
    'https://prep.library.nd.edu',
  ]

  for (const index in replaceUrls) {
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

  to += query

  if (to.startsWith('http')) {
    return External(to, props.noTarget, onClick, props.ariaLabel, props.arrow, propsToPass)
  }

  if (to.startsWith('mailto:') || to.startsWith('tel:')) {
    return External(to, false, onClick, props.ariaLabel, props.arrow, propsToPass)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, true, onClick, props.ariaLabel, props.arrow, propsToPass)
  }

  // Link to named anchor using native browser behavior
  if (to.search('#') > -1) {
    return External(to, true, undefined, props.ariaLabel, props.arrow, propsToPass)
  }

  // Ensure internal links start with '/'
  if (!to.startsWith('/')) {
    to = '/' + to
  }
  return Internal(to, onClick, props.ariaLabel, props.arrow, propsToPass)
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

Internal.propTypes = {
  children: PropTypes.any,
  arrow: PropTypes.bool,
}

External.propTypes = {
  children: PropTypes.any,
  arrow: PropTypes.bool,
}

Invalid.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

LibLink.propTypes = Object.assign({}, nonTagProps, {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any,
  itemProp: PropTypes.string,
  arrow: PropTypes.bool,
})

export default withRouter(connect()(LibLink))
