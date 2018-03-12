import EventCalendar from './presenter'
import { connect } from 'react-redux'
import moment from 'moment'

const mapStateToProps = (state, ownProps) => {
  const date = ownProps.match.params.date ? moment(ownProps.match.params.date, 'YYYYMMDD').format() : moment().format()

  let specialDays = []

  ownProps.allEvents.forEach((event) => {
    // If an event last longer than a month should we highlight all the days?
    // Highlight only the first and last days in this case.
    if (moment(event.endDate).diff(moment(event.startDate), 'days') > 28) {
      specialDays.push({ date: moment(event.startDate) })
      specialDays.push({ date: moment(event.endDate) })
    } else {
      const start = moment(event.startDate).format('YYYYMMDD')
      const end = moment(event.endDate).format('YYYYMMDD')
      let current = start
      while (current <= end) {
        specialDays.push({ date: moment(current, 'YYYYMMDD') })
        current = moment(current, 'YYYYMMDD').add(1, 'day').format('YYYYMMDD')
      }
    }
  })

  const theme = {
    Day            : {
      background   : '#f3f5f6',
      transition   : 'transform .1s ease, box-shadow .1s ease, background .1s ease',
    },
    DaySelected    : {
      background   : '#ffd102',
      border       : 'none',
      color        :  '#072242',
    },
    DayActive    : {
      background   : '#072242',
      border       : 'none',
      boxShadow    : 'none',
    },
    DayInRange     : {
      background   : '#072242',
      border       : 'none',
      color        : '#fff',
    },
    DaySpecialDay  : {
      background   : '#072242',
      color        : '#fff',
    },
  }

  return {
    date,
    specialDays,
    theme,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onChange = (selectedDate) => {
    const date = moment(selectedDate).format('YYYYMMDD')
    ownProps.history.push(`/events/${date}`)
  }

  return {
    onChange,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventCalendar)
