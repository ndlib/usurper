import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const PageLink = (props) => {
  if (props.cfPage) {
    return <Link
      to={props.cfPage.fields.slug}
      className={props.className}
    >{props.cfPage.fields.title}</Link>
  }
  return null
}

PageLink.propTypes = {
  cfPage: PropTypes.object,
  className: PropTypes.string,
}

export default PageLink
