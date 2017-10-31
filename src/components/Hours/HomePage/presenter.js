import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const days = ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa']

const Presenter = (hoursEntry) => {
  return (
    <section className='hours-display' aria-label='Today&#39;s Hours' itemScope itemType='http://schema.org/Library'>
      <h2>Today's <span itemProp='name'>Hesburgh Library</span> Hours: <Link to='hours'><span itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>{hoursEntry.today.rendered}</span></Link></h2>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
