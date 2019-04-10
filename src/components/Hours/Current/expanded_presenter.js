import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (props) => {
  const servicePointClassName = 'service-point ' + (props.isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + props.hoursEntry.today.rendered
  const ariaLabel = props.hoursEntry.name + ', Open ' + todayLabel

  let timezoneMessage = ''
  if (props.hoursEntry.timezone !== 'EST' || props.hoursEntry.timezone !== 'EDT') {
    timezoneMessage = (<p className='timezoneMessage'> * All times are {props.hoursEntry.timezone}</p>)
  }
  return (
    <section className={servicePointClassName} role='tablist'>
      <a
        className='collapse'
        tabIndex={0}
        onClick={props.collapseHandler}
        onKeyDown={props.collapseHandler}
      >
        <h4 aria-label={ariaLabel} className='sp'>
          <div className='location' itemProp='name'><h2>{props.hoursEntry.name}</h2></div>
          <div className='today' itemProp='openingHours' content={props.hoursEntry.today.schemaOpeningHours}>
            {todayLabel}
          </div>
          <div className='arrow'
            role='tab'
            aria-expanded
            aria-controls={props.hoursEntry.servicePoint.slug}
            aria-label={'View Hours For ' + props.hoursEntry.name}>
            <div className='carrow' />
          </div>
        </h4>
      </a>
      <div className='row hours-listing' role='tabpanel' id={props.hoursEntry.servicePoint.slug} aria-hidden={false}>
        <div className='col-md-6'>
          <WeeklyHours hours={props.hoursEntry.weeks[0]} title='Current Hours' showEffectiveDates={false} />
          <WeeklyHours hours={props.hoursEntry.upcomingChangedHours} title='Upcoming Hours' showEffectiveDates />
          { timezoneMessage }
        </div>
        <div className='col-md-5 col-md-offset-1'>
          { props.children }
        </div>
      </div>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  collapseHandler: PropTypes.func,
  children: PropTypes.any,
}

export default Presenter
