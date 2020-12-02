import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../../Wrapper'
import EventCard from 'components/EventCard'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      linkPath={'/events' + props.location.search}
      linkText={'Current Events'}
      pageTitle={props.pageTitle}
      entries={props.events}
      filteredEntries={props.events}
      location={props.location}
      history={props.history}
      typeLabel='Events'
      allEntriesStatus={props.fetchStatus}
      entryCardComponent={EventCard}
      filterFields={['title', 'content', 'shortDescription', 'audience[*]', 'type[*]', 'presenters[*].fields.people[*].fields.name']}
      sortFields={['startDate']}
    />
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  fetchStatus: PropTypes.string,
  events: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
}

export default Presenter
