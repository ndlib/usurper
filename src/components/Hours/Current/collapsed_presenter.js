import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  return (
    <div className='service-point'>
      <h4>
        <div className='location'>{hoursEntry.name}</div>
        <div className='today'>{'Today: ' + (isOpen ? hoursEntry.today.display : 'Closed')}</div>
        <div><span className='expand' onClick={expandHandler}>Expand</span></div>
      </h4>
      
    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
