import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']

const Presenter = (hoursEntry) => {
  const schemaOpeningHours = days[new Date().getDay()] + ' ' + hoursEntry.today.rendered

  return (
    <section className='hours-display' aria-label='Today&#39;s Hours' itemScope itemType='http://schema.org/Library'>
      <p>Today's <span itemProp='name'>Hesburgh Library</span> Hours: <Link to='hours' ariaLabel={hoursEntry.today.rendered + ' Click for more hours' }><span itemProp='openingHours' content={schemaOpeningHours}>{hoursEntry.today.rendered}</span></Link></p>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
