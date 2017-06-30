import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  const servicePointClassName = 'service-point' + (!isOpen ? ' closed' : '')
  const todayLabel = (isOpen ? 'Today: ' +  hoursEntry.today.display : 'Closed')
  return (
    <div className={servicePointClassName}>
      <h4>
        <div className='location'>{hoursEntry.name}</div>
        <div className='today'>{todayLabel}</div>
        <div className="ecarrow"><a className='expand' onClick={expandHandler}>Expand</a></div>
      </h4>

    </div>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
