import React from 'react'
import PropTypes from 'prop-types'
import AdvancedSearchField from './AdvancedSearchField'
import Bool from './Bool'
import MaterialType from './MaterialType'
import Language from './Language'
import DateField from './DateField'

const AdvancedSearch = (props) => {
  if (props.visible) {
    return (
      <div id='advanced-search'>
        <AdvancedSearchField id={0} />
        <Bool id='bool_0' />
        <AdvancedSearchField id={1} />
        <Bool id='bool_1' />
        <AdvancedSearchField id={2} />
        <fieldset>
          <MaterialType />
          <Language />
          <DateField id='drStart' label='Start Date' />
          <DateField id='drEnd' label='End Date' />
        </fieldset>
        <button onClick={props.onSubmit}>Search</button>
      </div>
    )
  }
  return null
}

export default AdvancedSearch