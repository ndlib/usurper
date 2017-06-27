import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  return (
    <div className='service-point'>
      <h4>
        <div>{hoursEntry.name}</div>
        <div>{'Today: ' + (isOpen ? hoursEntry.today.display : 'Closed')}</div>
        <button className='button' onClick={expandHandler}>Expand</button>
      </h4>
      {children}
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
