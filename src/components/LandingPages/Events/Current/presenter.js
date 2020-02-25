import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import LandingPageWrapper from '../../Wrapper'
import Facets from '../facets'
import EventCard from 'components/EventCard'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      linkPath={(props.pageDate ? '/events' : '/events/past') + props.location.search}
      linkText={props.pageDate ? 'Current Events' : 'Past Events'}
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      entries={props.events}
      filteredEntries={props.filteredEvents}
      location={props.location}
      history={props.history}
      typeLabel='Events'
      allEntriesStatus={props.allEventsStatus}
      facets={Facets}
      entryCardComponent={EventCard}
      filterFields={['title', 'content', 'shortDescription', 'audience[*]', 'type[*]', 'presenters[*].fields.people[*].fields.name']}
      sortFields={['startDate']}
    >
      <Calendar
        events={props.events}
        location={props.location}
        history={props.history}
        match={props.match}
      />
    </LandingPageWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  allEventsStatus: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
  match: PropTypes.object,
}

export default Presenter
