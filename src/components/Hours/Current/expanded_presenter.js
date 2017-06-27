import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, collapseHandler, children) => {
  return (
    <div className='service-point'>
      <h4>
        <div>{hoursEntry.name}</div>
        <div>{'Today: ' + (isOpen ? hoursEntry.today.display : 'Closed')}</div>
        <button className='button' onClick={collapseHandler}>Collapse</button>
      </h4>
      <WeeklyHours hours={hoursEntry.thisWeek} title='Current Hours' showEffectiveDates={false} />
      <WeeklyHours hours={hoursEntry.upcomingDifferentHours} title='Upcoming Hours' showEffectiveDates />
      {children}
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
