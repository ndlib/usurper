import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const Presenter = (hoursEntry) => {
  return (
    <div className='header-hours'>
      <p>{hoursEntry.name}: <Link to='/hours'>{ hoursEntry.today.display }</Link></p>
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.string.isRequired,
}

export default Presenter
