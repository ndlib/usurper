import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Presenter = (props) => {
  const servicePointClassName = 'service-point ' + (props.isOpen ? 'open' : 'closed')
  const todayLabel = 'Today: ' + props.hoursEntry.today.rendered
  const ariaLabel = props.hoursEntry.name + ', Open ' + todayLabel

  let schemaType = 'http://schema.org/ContactPoint'
  if (props.hoursEntry.servicePoint.type === 'http://schema.org/Library') {
    schemaType = 'Library'
  }
  return (
    <section className={servicePointClassName} itemScope itemType={schemaType} role='tablist'>
      <a
        className='expand'
        tabIndex={0}
        onClick={props.expandHandler}
        onKeyDown={props.expandHandler}
      >
        <div aria-label={ariaLabel} className='sp'>
          <div className='location' itemProp='name'><h2>{props.hoursEntry.name}</h2></div>
          <div className='today' itemProp='openingHours' content={props.hoursEntry.today.schemaOpeningHours}>
            {todayLabel}
          </div>
          <div className='arrow'
            role='tab'
            aria-expanded={false}
            aria-controls={props.hoursEntry.servicePoint.slug}
            aria-label={'View Hours For ' + props.hoursEntry.name}>
            <div className='earrow' />
          </div>
        </div>
      </a>
      <div className={props.hoursEntry.servicePoint.slug} role='tabpanel' aria-hidden />
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  expandHandler: PropTypes.func,
}

export default Presenter
