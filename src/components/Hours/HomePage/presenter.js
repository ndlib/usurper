import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const Presenter = (hoursEntry) => {
  return (
    <section className='hours-display' aria-label='Today&#39;s Hours'>
      <p>Today's Hesburgh Library Hours: <Link to='hours' ariaLabel={ hoursEntry.today.rendered + ' Click for more hours' }>{hoursEntry.today.rendered}</Link></p>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
