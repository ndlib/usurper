import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from 'components/Interactive/Link'
import Calendar from '../Calendar'
import { withRouter } from 'react-router'
import moment from 'moment'

const EventDate = (props) => {
  // Validate this is a real date string
  const dateRegEx = /\d{8}/
  const dateString = props.match.params.date
  if (dateString.length !== 8 || dateString.match(dateRegEx) === null) {
    props.history.push('/events')
    return null
  }

  // For PageTitle
  const displayDate = moment(props.match.params.date).format('MMM Do YYYY')

  // Filter all events down to current range
  const date = moment(props.match.params.date, 'YYYYMMDD').format('YYYYMMDD')

  const filteredEvents = props.events.filter((entry) => {
    const start = moment(entry.startDate).format('YYYYMMDD')
    const end = moment(entry.endDate).format('YYYYMMDD')
    return start === date || end === date || (start < date && end >= date)
  })

  return (
    <div className='content'>
      <Link to='/events' className='button fright tab'>Current Events</Link>
      <PageTitle title={`Events on ${displayDate}`} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-xs-12' >
          {
            filteredEvents.length > 0 ? filteredEvents.map(
              (event, index) => makeEventEntry(event, index,
                index === filteredEvents.length - 1))
              : 'There are no events on this date.'
          }
        </div>
        <div className='col-md-4 col-xs-12'>
          <Calendar date={date} allEvents={props.events} {...props} />
        </div>
      </div>
    </div>
  )
}

EventDate.propTypes = {
  events: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}
export default withRouter(EventDate)
