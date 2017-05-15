import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'

const Presenter = (hoursEntry) => {
  return (
    <div>
      <h2>Hours</h2>
      <hr />
      <div>
        <p>View building and service desk hours.</p>
      </div>
      {
        Object.keys(hoursEntry).map(function (hoursKey) {
          return (<CurrentHours jsonHoursApiKey={hoursKey} key={hoursKey} />)
        })
      }
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
