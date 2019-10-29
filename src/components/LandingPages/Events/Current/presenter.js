import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import EventsWrapper from '../Wrapper'

const Presenter = (props) => {
  return (
    <EventsWrapper
      linkPath={(props.pageDate ? '/events' : '/events/past') + props.location.search}
      linkText={props.pageDate ? 'Current Events' : 'Past Events'}
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      events={props.events}
      filteredEvents={props.filteredEvents}
      location={props.location}
      history={props.history}
    >
      <Calendar
        events={props.events}
        location={props.location}
        history={props.history}
        match={props.match}
      />
    </EventsWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
  match: PropTypes.object,
}

export default Presenter
