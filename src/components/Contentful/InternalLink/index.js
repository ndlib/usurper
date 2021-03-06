import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import Link from 'components/Interactive/Link'

const InternalLink = (props) => {
  const page = props.cfEntry.fields.page
  const link = page ? (typy(page, 'fields.slug').safeString || typy(page, 'fields.url').safeString) : null
  const displayText = (props.cfEntry.fields.usePageTitle && props.cfEntry.fields.page)
    ? page.fields.title
    : props.cfEntry.fields.title

  return <Link to={link} className={props.className}>{displayText}</Link>
}

InternalLink.propTypes = {
  cfEntry: PropTypes.shape({
    fields: {
      title: PropTypes.string.isRequired,
      page: PropTypes.shape({
        fields: {
          slug: PropTypes.string,
          url: PropTypes.string,
        }.isRequired,
      }).isRequired,
      usePageTitle: PropTypes.bool,
    }.isRequired,
  }).isRequired,
  className: PropTypes.string,
}

export default InternalLink
