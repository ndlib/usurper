import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point ' + (isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + hoursEntry.today.rendered
  const ariaLabel = hoursEntry.name + ', Open ' + todayLabel

  let schemaType = 'http://schema.org/ContactPoint'
  if (hoursEntry.servicePoint.type === 'http://schema.org/Library') {
    schemaType = 'Library'
  }
  return (
    <section className={servicePointClassName} itemScope itemType={schemaType} role='tablist'>
      <a
        className='expand'
        tabIndex={0}
        onClick={expandHandler}
        onKeyDown={expandHandler}
      >
        <h4 aria-label={ariaLabel}>
          <div className='location' itemProp='name'>{hoursEntry.name}</div>
          <div className='today' itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>{todayLabel}</div>
          <div className='arrow'
            role='tab'
            aria-expanded={false}
            aria-controls={hoursEntry.servicePoint.slug}
            aria-label={'View Hours For ' + hoursEntry.name}>
            <div className='earrow' />
          </div>
        </h4>
      </a>
      <div className={hoursEntry.servicePoint.slug} role='tabpanel' aria-hidden={true} />
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
