import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point' + (!isOpen ? ' closed' : '')
  const todayLabel = (isOpen ? 'Today: ' + hoursEntry.today.display : 'Closed')
  return (
    <section className='service-point' title={title}>
      <h4>
        <div className='location'>{hoursEntry.name}</div>
        <div className='today'>{todayLabel}</div>
        <div className='ecarrow'>
          <a id='expand_hours' className='expand' tabIndex={0} onClick={expandHandler} onKeyDown={expandHandler}>Expand</a>
        </div>
      </h4>

    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
