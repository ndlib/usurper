import React from 'react'
import PropTypes from 'prop-types'
import SearchField from './SearchField'
import MatchType from './MatchType'
import SearchInput from './SearchInput'

const AdvancedSearchField = (props) => {
  return (
    <fieldset id={`exlidAdvancedSearchFieldset${props.id}`} >
      <SearchField id={`exlidInput_scope_${props.id}`} />
      <MatchType id={`exlidInput_precisionOperator_${props.id}`} />
      <SearchInput id={`input_freeText${props.id}`} />
    </fieldset>
  )
}

export default AdvancedSearchField
