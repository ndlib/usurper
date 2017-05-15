import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link from '../../Link'

const Presenter = (hoursEntry) => {
  return (
    <div className='hours-display'>
      <p>Hours Today: <Link to='hours'>{hoursEntry.today.display}</Link></p>
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
