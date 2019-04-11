import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Presenter = (hoursEntry, isOpen, expandHandler) => {
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
      </a>
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
  isOpen: PropTypes.bool,
  expandHandler: PropTypes.func,
}

export default Presenter
