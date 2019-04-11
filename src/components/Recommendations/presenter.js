import React from 'react'
import PropTypes from 'prop-types'

// TODO: Fix, update, or remove this. Maybe should be lambda purl path?
const redirectPrefix = 'https://7w0g1d1dah.execute-api.us-east-1.amazonaws.com/dev/databases/'

const Recommendations = (props) => {
  if (!props.recommend) {
    return null
  }
  return (
    <div>
      <ul key='Recommendations'>

        {
          props.recommend.map((item) => {
            const url = redirectPrefix + item.token

            return (
              <li key={url}>
                <a href={url}>{item.name}</a>
              </li>
            )
          })
        }

      </ul>
    </div>
  )
}

Recommendations.propTypes = {
  recommend: PropTypes.array,
}

export default Recommendations
