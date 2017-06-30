import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, collapseHandler, children) => {
  const servicePointClassName = 'service-point' + (!isOpen ? ' closed' : '')
  const todayLabel = (isOpen ? 'Today: ' + hoursEntry.today.display : 'Closed')
  return (
    <div className={servicePointClassName}>
      <h4>
        <div className='location'>{hoursEntry.name}</div>
        <div className='today'>{todayLabel}</div>
        <div className="ecarrow"><a className='collapse' onClick={collapseHandler}>Collapse</a></div>
      </h4>
      <div className='row hours-listing'>
        <div className='col-md-4'>
          <WeeklyHours hours={hoursEntry.thisWeek} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={hoursEntry.upcomingDifferentHours} title='Upcoming Hours' showEffectiveDates />
        </div>
        <div className='col-md-6 col-md-offset-2'>
          {children}
        </div>
      </div>
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
