import React from 'react'
import PropTypes from 'prop-types'
import SearchField from './SearchField'
import MatchType from './MatchType'
import SearchInput from './SearchInput'

const AdvancedSearchField = (props) => {
  return (
    <fieldset id={`exlidAdvancedSearchFieldset${props.id}`} >
      <SearchField id={`scope_${props.id}`} />
      <MatchType id={`precisionOperator_${props.id}`} />
      <SearchInput id={`freeText_${props.id}`} />
    </fieldset>
  )
}

export default AdvancedSearchField
