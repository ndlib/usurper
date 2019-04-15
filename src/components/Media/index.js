import React from 'react'
import PropTypes from 'prop-types'

import Link from '../Interactive/Link'

const Media = ({ data }) => {
  if (!data) {
    return null
  }
  return (
    <div className='media'>
      {
        data.map((entry) => {
          return (
            <Link
              key={entry.fields.title}
              to={entry.fields.url}
              className={entry.fields.type}
            >
              {entry.fields.title}
            </Link>
          )
        })
      }
    </div>
  )
}

Media.propTypes = {
  data: PropTypes.array,
}

export default Media
