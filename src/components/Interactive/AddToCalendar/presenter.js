import React from 'react'
import PropTypes from 'prop-types'
import calendarIcon from 'static/images/calendar.png'

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
        aria-expanded={!props.hidden}
        role='tree'
      >
        <ul>
          <li role='treeitem'>
            <button className='custom-style' onClick={props.addToGoogle}>Add to Google Calendar</button>
          </li>
          <li role='treeitem'>
            <button className='custom-style' onClick={props.downloadClick}>Download Event</button>
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
