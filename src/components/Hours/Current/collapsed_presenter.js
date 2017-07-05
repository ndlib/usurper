import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import WeeklyHours from '../WeeklyHours'

const Presenter = (hoursEntry, isOpen, expandHandler, children) => {
  const title = 'Hours for ' + hoursEntry.name
  const servicePointClassName = 'service-point' + (!isOpen ? ' closed' : '')
  const todayLabel = (isOpen ? 'Today: ' + hoursEntry.today.display : 'Closed')
  return (
    <section className='service-point' aria-label={title}>
      <div id='expand_hours' className='expand' tabIndex={0} onClick={expandHandler} onKeyDown={expandHandler}>
        <h4>
          <div className='location'>{hoursEntry.name}</div>
          <div className='today'>{todayLabel}</div>
          <div>
            <div className='earrow' />
          </div>
        </h4>
      </div>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Presenter
