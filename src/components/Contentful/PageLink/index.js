import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import { withErrorBoundary } from 'components/ErrorBoundary'

const PageLink = (props) => {
  if (props.cfPage && props.cfPage.fields) {
    const link = props.cfPage.fields.slug ? props.cfPage.fields.slug : props.cfPage.fields.url

    return <Link
      to={link}
      className={props.className}
    >{props.cfPage.fields.title}</Link>
  }
  return null
}

PageLink.propTypes = {
  cfPage: PropTypes.object,
  className: PropTypes.string,
}

export default withErrorBoundary(PageLink)
