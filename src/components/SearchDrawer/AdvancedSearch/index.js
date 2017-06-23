import React from 'react'
import PropTypes from 'prop-types'
import SearchField from './SearchField'
import MatchType from './MatchType'
import SearchInput from './SearchInput'
import Bool from './Bool'
import MaterialType from './MaterialType'
import Language from './Language'
import DateField from './DateField'
const AdvancedSearch = (props) => {
  if (props.visible) {
    return (
      <div>
        <fieldset>
          <SearchField /><MatchType /><SearchInput />
        </fieldset>
        <Bool />
        <fieldset>
          <SearchField /><MatchType /><SearchInput />
        </fieldset>
        <Bool />
        <fieldset>
          <SearchField /><MatchType /><SearchInput />
        </fieldset>
        <fieldset>
          <MaterialType />
          <Language />
          <DateField id='drStart' label='Start Date' />
          <DateField id='drEnd' label='End Date' />
        </fieldset>
        <button type='submit'>Search</button>
      </div>
    )
  }
  return null
}

export default AdvancedSearch
