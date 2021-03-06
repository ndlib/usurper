import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../../Wrapper'
import EventCard from 'components/EventCard'
import DateFilter from 'components/Interactive/DateFilter'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      linkPath={'/events' + props.location.search}
      linkText='Current Events'
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      entries={props.events}
      filteredEntries={props.filteredEvents}
      location={props.location}
      history={props.history}
      typeLabel='Events'
      allEntriesStatus={props.combinedStatus}
      facets={props.facets}
      entryCardComponent={EventCard}
      filterFields={['title', 'content', 'shortDescription', 'audience[*]', 'type[*]', 'presenters[*].fields.people[*].fields.name']}
      sortFields={['startDate']}
    >
      <DateFilter
        entries={props.events}
        filterYear={props.filterYear}
        filterMonth={props.filterMonth}
        location={props.location}
      />
    </LandingPageWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  facets: PropTypes.array.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
}

export default Presenter
