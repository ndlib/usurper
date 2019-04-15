import React from 'react'
import PropTypes from 'prop-types'
import calendarIcon from '../../../static/images/calendar.png'

const AddToCalendar = (props) => {
  return (
    <div className='addToCalendar'>
      <button onClick={props.toggleDropdown}>
        <img className='calendar' src={calendarIcon} alt='calendar' />
      </button>
      <div
        tabIndex='0'
        id='calendarOptions'
        onBlur={props.onBlur}
        className={'dropdown' + (props.hidden ? ' hidden' : '')}
      >
        <ul>
          <li onClick={props.addToGoogle}>
            Add to Google Calendar
          </li>
          <li onClick={props.downloadClick}>
            Download Event
          </li>
        </ul>
      </div>
    </div>
  )
}

AddToCalendar.propTypes = {
  toggleDropdown: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
  addToGoogle: PropTypes.func.isRequired,
  downloadClick: PropTypes.func.isRequired,
}

export default AddToCalendar
