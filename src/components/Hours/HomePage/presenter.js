import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Interactive/Link'

const Presenter = (hoursEntry) => {
  return (
    <section className='hours-display' aria-label='Today&#39;s Hours' itemScope itemType='http://schema.org/Library'>
      <h2>Today's <span itemProp='name'>Hesburgh Library</span> Hours:&nbsp;
        <Link to='hours' ariaLabel={hoursEntry.today.rendered + ' - Click for more hours'}>
          <span itemProp='openingHours' content={hoursEntry.today.schemaOpeningHours}>
            {hoursEntry.today.rendered}
          </span>
        </Link>
      </h2>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.shape({
    today: PropTypes.shape({
      rendered: PropTypes.string,
      schemaOpeningHours: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default Presenter
