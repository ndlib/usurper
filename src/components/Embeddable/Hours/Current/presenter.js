import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../../../Hours/WeeklyHours'

const Presenter = (hoursEntry, isOpen) => {
  const servicePointClassName = 'service-point ' + (isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + hoursEntry.today.rendered
  const ariaLabel = hoursEntry.name + ', Open ' + todayLabel

  let timezoneMessage = ''
  if (hoursEntry.timezone !== 'EST' || hoursEntry.timezone !== 'EDT') {
    timezoneMessage = (<p className='timezoneMessage'> * All times are {hoursEntry.timezone}</p>)
  }
  return (
    <section className={servicePointClassName}>
      <div className='row hours-listing' role='tabpanel' id={hoursEntry.servicePoint.slug} aria-hidden={false}>
        <div className='col-md-6'>
          <h4 aria-label={ariaLabel}>
            <div className='location' itemProp='name'>{hoursEntry.name}</div>
            <div
              className='today'
              itemProp='openingHours'
              content={hoursEntry.today.schemaOpeningHours}
            >{todayLabel}</div>
          </h4>
          <WeeklyHours hours={hoursEntry.weeks[0]} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={hoursEntry.upcomingChangedHours} title='Upcoming Hours' showEffectiveDates />
          { timezoneMessage }
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
  isOpen: PropTypes.bool,
}

export default Presenter
