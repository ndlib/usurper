import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../../Wrapper'
import ExhibitCard from 'components/ExhibitCard'
import Link from 'components/Interactive/Link'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      linkPath={(props.pageDate ? '/exhibits' : '/exhibits/past') + props.location.search}
      linkText={props.pageDate ? 'Current Exhibits' : 'Past Exhibits'}
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      entries={props.exhibits}
      filteredEntries={props.filteredExhibits}
      location={props.location}
      history={props.history}
      typeLabel='Exhibits'
      allEntriesStatus={props.allExhibitsStatus}
      entryCardComponent={ExhibitCard}
      entryCardProps={{
        horizontal: true,
        showDetails: true,
      }}
      filterFields={['title', 'type', 'event.title', 'event.shortDescription']}
      sortFields={['event.startDate']}
    >
      <Link to='https://collections.library.nd.edu' className='button callout'>View Digital Exhibits</Link>
    </LandingPageWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  exhibits: PropTypes.array.isRequired,
  filteredExhibits: PropTypes.array.isRequired,
  allExhibitsStatus: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
}

export default Presenter
