import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../Wrapper'
import SpaceCard from 'components/SpaceCard'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      slug='study-spaces'
      pageTitle='Hesburgh Library Study Spaces'
      entries={props.spaces}
      filteredEntries={props.spaces}
      location={props.location}
      history={props.history}
      allEntriesStatus={props.combinedStatus}
      facets={props.facets}
      entryCardComponent={SpaceCard}
      filterFields={['fields.title', 'fields.description', 'fields.features[*]']}
      sortFields={['fields.floor.fields.floorNumber', 'fields.title']}
    />
  )
}

Presenter.propTypes = {
  spaces: PropTypes.array.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  facets: PropTypes.array.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default Presenter
