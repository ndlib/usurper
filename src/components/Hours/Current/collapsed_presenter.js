import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  let title = 'Hours for ' + hoursEntry.name
  return (
    <section className='service-point' title={title}>
      <h4>
        <div className='location'>{hoursEntry.name}</div>
        <div className='today'>{(isOpen ? 'Today: ' +  hoursEntry.today.display : 'Closed')}</div>
        <div className="ecarrow"><a className='expand' onClick={expandHandler}>Expand</a></div>
      </h4>

    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
