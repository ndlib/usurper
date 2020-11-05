import React from 'react'
import PropTypes from 'prop-types'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'

const SummaryLink = (props) => {
  return (
    <li>
      <Link to={props.link.url}>{props.link.title}</Link>
      { props.link.notes && (
        <LibMarkdown>{props.link.notes}</LibMarkdown>
      )}
    </li>
  )
}

SummaryLink.propTypes = {
  link: PropTypes.shape({
    url: PropTypes.string,
    title: PropTypes.string.isRequired,
    notes: PropTypes.string,
  }),
}

export default SummaryLink
