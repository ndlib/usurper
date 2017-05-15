import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry) => {
  return (
    <div className='service-point'>
      <h4>{hoursEntry.name}</h4>
      <WeeklyHours hours={hoursEntry.thisWeek} title='Current Hours' showEffectiveDates={false} />
      <WeeklyHours hours={hoursEntry.upcomingDifferentHours} title='Upcoming Hours' showEffectiveDates={true} />
      <hr />
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
