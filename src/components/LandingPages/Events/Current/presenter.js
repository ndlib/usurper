import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import EventsWrapper from '../Wrapper'

const Presenter = (props) => {
  return (
    <EventsWrapper
      linkPath={props.pageDate ? '/events' : '/events/past'}
      linkText={props.pageDate ? 'Current Events' : 'Past Events'}
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      events={props.events}
      filteredEvents={props.filteredEvents}
    >
      <div className='col-md-4 col-sm-5 col-xs-12 right'>
        <Calendar events={props.events} history={props.history} match={props.match} />
      </div>
    </EventsWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
}

export default Presenter
