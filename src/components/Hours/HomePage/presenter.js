import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const Presenter = (props) => {
  return (
    <section className='hours-display' aria-label='Today&#39;s Hours' itemScope itemType='http://schema.org/Library'>
      <h2>Today's <span itemProp='name'>Hesburgh Library</span> Hours:&nbsp;
        <Link to='hours' ariaLabel={props.hoursEntry.today.rendered + ' - Click for more hours'}>
          <span itemProp='openingHours' content={props.hoursEntry.today.schemaOpeningHours}>
            {props.hoursEntry.today.rendered}
          </span>
        </Link>
      </h2>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
