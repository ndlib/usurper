import React from 'react'
import PropTypes from 'prop-types'
import { Calendar } from 'react-date-range'
import { withRouter } from 'react-router'
import moment from 'moment'

const EventCalendar = (props) => {
  return (
    <Calendar
      format='YYYYMMDD'
      onChange={props.onChange}
      date={props.date}
      theme={props.theme}
      specialDays={props.specialDays}
      minDate={moment(new Date())}
    />
  )
}
EventCalendar.propTypes = {
  date: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  specialDays: PropTypes.array.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withRouter(EventCalendar)
