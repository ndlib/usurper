import React from 'react'
import PropTypes from 'prop-types'

import LandingPageWrapper from '../Wrapper'
import Facets from './facets'
import SpaceCard from 'components/SpaceCard'

const Presenter = (props) => {
  return (
    <LandingPageWrapper
      pageTitle='Study Spaces'
      entries={props.spaces}
      filteredEntries={props.spaces}
      location={props.location}
      history={props.history}
      allEntriesStatus={props.allSpacesStatus}
      facets={Facets}
      entryCardComponent={SpaceCard}
      filterFields={['fields.name', 'fields.description', 'fields.features[*]']}
      sortFields={['fields.name']}
    />
  )
}

Presenter.propTypes = {
  spaces: PropTypes.array.isRequired,
  allSpacesStatus: PropTypes.string.isRequired,
  location: PropTypes.object,
  history: PropTypes.object,
}

export default Presenter
