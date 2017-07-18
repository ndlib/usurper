import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, collapseHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point ' + (isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + hoursEntry.today.display
  return (
    <section className={servicePointClassName} aria-label={title}>
      <a
        id='collapse_hours'
        className='collapse'
        tabIndex={0}
        onClick={collapseHandler}
        onKeyDown={collapseHandler}
        aria-expanded={true}
        aria-controls={hoursEntry.name}
      >
        <h4>
          <div className='location'>{hoursEntry.name}</div>
          <div className='today'>{todayLabel}</div>
          <div>
            <div className='carrow' />
          </div>
        </h4>
      </a>
      <div className='row hours-listing' id={hoursEntry.name}>
        <div className='col-md-4'>
          <WeeklyHours hours={hoursEntry.thisWeek} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={hoursEntry.upcomingDifferentHours} title='Upcoming Hours' showEffectiveDates />
        </div>
        <div className='col-md-6 col-md-offset-2'>
          {children}
        </div>
      </div>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
