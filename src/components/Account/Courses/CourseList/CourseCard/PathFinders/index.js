import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'

const PathFinders = (props) => {
  if (!props.data || !props.data.length) {
    return null
  }

  return (
    <ul>
      { props.data.map((item) =>
        <li key={item.url}>
          <Link to={item.url}>{item.title} Resources</Link>
        </li>
      )}
    </ul>
  )
}

PathFinders.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
}

export default PathFinders
