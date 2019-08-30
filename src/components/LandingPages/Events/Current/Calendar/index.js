import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EventCalendar = (props) => {
  const selectedDate = props.match.params.date ? moment(props.match.params.date, 'YYYYMMDD').toDate() : null
  const specialDays = []
  const today = new Date(new Date().setHours(0, 0, 0, 0))

  props.events.forEach((event) => {
    // If an event last longer than a month should we highlight all the days?
    // Highlight only the first and last days in this case.
    if (moment(event.endDate).diff(moment(event.startDate), 'days') > 28) {
      if (event.startDate >= today) {
        specialDays.push(event.startDate)
      }
      if (event.endDate >= today) {
        specialDays.push(event.endDate)
      }
    } else {
      let current = new Date(event.startDate)
      const end = new Date(event.endDate)

      while (current <= end) {
        if (current >= today) {
          specialDays.push(current)
        }
        current = moment(current, 'YYYYMMDD').add(1, 'day').toDate()
      }
    }
  })

  const onChange = (selectedDate) => {
    const date = moment(selectedDate).format('YYYYMMDD')
    props.history.push(`/events/${date}`)
  }

  return (
    <DatePicker
      inline
      selected={selectedDate}
      onChange={onChange}
      highlightDates={specialDays}
      minDate={new Date()}
      color='#ffd102'
    />
  )
}

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  })).isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default EventCalendar
