import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../../Wrapper'
import ExhibitCard from 'components/ExhibitCard'
import DateFilter from 'components/Interactive/DateFilter'
import Link from 'components/Interactive/Link'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      linkPath={'/exhibits' + props.location.search}
      linkText='Current Exhibits'
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
      sortOrder='desc'
    >
      <Link to='https://collections.library.nd.edu' className='button callout'>View Digital Exhibits</Link>
      <DateFilter
        entries={props.exhibits.map(exhibit => exhibit.event)}
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
  exhibits: PropTypes.arrayOf(PropTypes.shape({
    event: PropTypes.object,
  })).isRequired,
  filteredExhibits: PropTypes.array.isRequired,
  allExhibitsStatus: PropTypes.string.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.object,
}

export default Presenter
