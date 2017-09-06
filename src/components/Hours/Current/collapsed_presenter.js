import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point ' + (isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + hoursEntry.today.rendered
  return (
    <section className={servicePointClassName} aria-label={title}>
      <a
        className='expand'
        tabIndex={0}
        onClick={expandHandler}
        onKeyDown={expandHandler}
        aria-expanded={false}
        aria-controls={hoursEntry.servicePoint.slug}
      >
        <h4>
          <div className='location'>{hoursEntry.name}</div>
          <div className='today'>{todayLabel}</div>
          <div className='arrow'>
            <div className='earrow' />
          </div>
        </h4>
      </a>
      <div id={hoursEntry.servicePoint.slug} aria-hidden={true} />
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
