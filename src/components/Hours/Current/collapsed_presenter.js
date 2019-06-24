import React from 'react'
import PropTypes from 'prop-types'
import { hoursOpenStatus } from './index'
import './style.css'

const Presenter = (hoursEntry, openStatus, expandHandler) => {
  const servicePointClassName = 'service-point ' + (
    openStatus === hoursOpenStatus.OPEN
      ? 'open'
      : openStatus === hoursOpenStatus.CLOSED ? 'closed' : 'swipe-only'
  )
  const todayLabel = 'Today: ' + hoursEntry.today.rendered
  const ariaLabel = hoursEntry.name + ', Open ' + todayLabel

  let schemaType = 'http://schema.org/ContactPoint'
  if (hoursEntry.servicePoint.type === 'http://schema.org/Library') {
    schemaType = 'Library'
  }
  return (
    <section className={servicePointClassName} itemScope itemType={schemaType} role='tablist'>
      <button
        className='custom-style expand'
        tabIndex={0}
        onClick={expandHandler}
        onKeyDown={expandHandler}
      >
        <div aria-label={ariaLabel} className='sp'>
          <div className='location' itemProp='name'><h2>{hoursEntry.name}</h2></div>
          <div className='today' itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>
            {todayLabel}
          </div>
          <div className='arrow'
            role='tab'
            aria-expanded={false}
            aria-controls={hoursEntry.servicePoint.slug}
            aria-label={'View Hours For ' + hoursEntry.name}>
            <div className='earrow' />
          </div>
        </div>
      </button>
      <div className={hoursEntry.servicePoint.slug} role='tabpanel' aria-hidden />
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.shape({
    name: PropTypes.string,
    today: PropTypes.shape({
      rendered: PropTypes.string,
      schemaOpeningHours: PropTypes.string,
    }),
    servicePoint: PropTypes.shape({
      slug: PropTypes.string,
      type: PropTypes.string,
    }),
  }).isRequired,
  openStatus: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  expandHandler: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
}

export default Presenter
