import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

class EventCalendar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: this.props.match.params.date ? moment(this.props.match.params.date, 'YYYYMMDD').toDate() : null,
    }
  }

  render () {
    const onChange = (selectedDate) => {
      const date = moment(selectedDate).format('YYYYMMDD')
      this.props.history.push(`/events/${date}`)
      this.setState({
        date: selectedDate,
      })
    }

    return (
      <DatePicker
        inline
        selected={this.state.date}
        onChange={onChange}
        highlightDates={this.props.specialDays}
        minDate={new Date()}
        color='#ffd102'
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const specialDays = []

  const today = new Date(new Date().setHours(0, 0, 0, 0))

  ownProps.events.forEach((event) => {
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
      let current = event.startDate
      while (current <= event.endDate) {
        if (current >= today) {
          specialDays.push(current)
        }
        current = moment(current, 'YYYYMMDD').add(1, 'day').toDate()
      }
    }
  })

  return {
    specialDays,
  }
}

EventCalendar.propTypes = {
  specialDays: PropTypes.array,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default connect(
  mapStateToProps,
)(EventCalendar)
