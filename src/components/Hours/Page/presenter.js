import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import CurrentHours from '../Current'

const Presenter = (hoursEntry) => {
  return (
    <div className='container-fluid content-area'>
      <h2>Hours</h2>
      <hr />
      <div>
        <p>View building and service desk hours.</p>
      </div>
      <div className="service-point-list">
      {
        Object.keys(hoursEntry).map((hoursKey) => {
          return (<CurrentHours jsonHoursApiKey={hoursKey} key={hoursKey} />)
        })
      }
      </div>
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
