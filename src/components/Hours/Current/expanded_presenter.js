import React from 'react'
import PropTypes from 'prop-types'
import { hoursOpenStatus } from './index'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, openStatus, collapseHandler, children) => {
  const servicePointClassName = 'service-point ' + (
    openStatus === hoursOpenStatus.OPEN
      ? 'open'
      : openStatus === hoursOpenStatus.CLOSED ? 'closed' : 'swipe-only'
  )
  const todayLabel = 'Today: ' + hoursEntry.today.rendered
  const ariaLabel = hoursEntry.name + ', Open ' + todayLabel

  let timezoneMessage = ''
  if (hoursEntry.timezone !== 'EST' || hoursEntry.timezone !== 'EDT') {
    timezoneMessage = (<p className='timezoneMessage'> * All times are {hoursEntry.timezone}</p>)
  }
  return (
    <section className={servicePointClassName} role='tablist'>
      <button
        className='custom-style collapse'
        tabIndex={0}
        onClick={collapseHandler}
        onKeyDown={collapseHandler}
      >
        <h4 aria-label={ariaLabel} className='sp'>
          <div className='location' itemProp='name'><h2>{hoursEntry.name}</h2></div>
          <div className='today' itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>
            {todayLabel}
          </div>
          <div className='arrow'
            role='tab'
            aria-expanded
            aria-controls={hoursEntry.servicePoint.slug}
            aria-label={'View Hours For ' + hoursEntry.name}>
            <div className='carrow' />
          </div>
        </h4>
      </button>
      <div className='row hours-listing' role='tabpanel' id={hoursEntry.servicePoint.slug} aria-hidden={false}>
        <div className='col-md-6'>
          <WeeklyHours hours={hoursEntry.weeks[0]} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={hoursEntry.upcomingChangedHours} title='Upcoming Hours' showEffectiveDates />
          { timezoneMessage }
        </div>
        <div className='col-md-5 col-md-offset-1'>
          { children }
        </div>
      </div>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.shape({
    name: PropTypes.string,
    servicePoint: PropTypes.shape({
      slug: PropTypes.string,
    }),
    today: PropTypes.shape({
      rendered: PropTypes.string,
      schemaOpeningHours: PropTypes.string,
    }),
    timezone: PropTypes.string,
    weeks: PropTypes.array,
    upcomingChangedHours: PropTypes.object,
  }).isRequired,
  openStatus: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  collapseHandler: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  children: PropTypes.any, // eslint-disable-line react/no-unused-prop-types
}

export default Presenter
