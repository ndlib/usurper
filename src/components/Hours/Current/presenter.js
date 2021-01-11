import React from 'react'
import PropTypes from 'prop-types'

import WeeklyHours from './WeeklyHours'
import { hoursOpenStatus } from 'constants/hours'
import '../style.css'
import './style.css'

const statusClassName = (status) => {
  switch (status) {
    case hoursOpenStatus.OPEN:
      return 'open'
    case hoursOpenStatus.PARTIALLY_OPEN:
      return 'swipe-only'
    case hoursOpenStatus.CLOSED:
    default:
      return 'closed'
  }
}

const schemaType = (servicePointType) => {
  switch (servicePointType) {
    case 'Library':
      return 'http://schema.org/Library'
    default:
      return 'http://schema.org/ContactPoint'
  }
}

const Presenter = ({ hoursEntry, openStatus, expanded, toggleExpanded, children }) => {
  const todayLabel = `Today: ${hoursEntry.today.rendered}`

  return (
    <section className={`service-point ${statusClassName(openStatus)}`} itemScope itemType={schemaType(hoursEntry.servicePoint.type)} role='tablist'>
      <button className={`custom-style ${expanded ? 'collapse' : 'expand'}`} tabIndex={0} onClick={toggleExpanded} onKeyDown={toggleExpanded}>
        <h4 aria-label={`${hoursEntry.name}, Open ${todayLabel}`} className='sp'>
          <div className='location' itemProp='name'><h2>{hoursEntry.name}</h2></div>
          <div className='today' itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>
            {todayLabel}
          </div>
          <div className='arrow' role='tab' aria-expanded={expanded} aria-controls={hoursEntry.servicePoint.slug} aria-label={`View Hours For ${hoursEntry.name}`}>
            <span className={expanded ? 'carrow' : 'earrow'} />
          </div>
        </h4>
      </button>
      { expanded && (
        <div className='row hours-listing' role='tabpanel' id={hoursEntry.servicePoint.slug}>
          <div className='col-md-6'>
            <WeeklyHours hours={hoursEntry.weeks[0]} title='Current Hours' showEffectiveDates={false} />
            <WeeklyHours hours={hoursEntry.upcomingChangedHours} title='Upcoming Hours' showEffectiveDates />
            { ['EST', 'EDT'].includes(hoursEntry.timezone) && (
              <p className='timezoneMessage'> * All times are {hoursEntry.timezone}</p>
            )}
          </div>
          <div className='col-md-5 col-md-offset-1'>
            { children }
          </div>
        </div>
      )}
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
  openStatus: PropTypes.string,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
  children: PropTypes.any,
}

export default Presenter
