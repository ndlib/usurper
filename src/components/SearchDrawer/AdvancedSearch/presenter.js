import React from 'react'
import PropTypes from 'prop-types'
import AdvancedSearchTitle from './AdvancedSearchTitle'
import AdvancedSearchField from './AdvancedSearchField'
import Bool from './Bool'
import MaterialType from './MaterialType'
import Language from './Language'
import DateField from './DateField'
import SearchScope from './SearchScope'

const AdvancedSearch = (props) => {
  if (props.visible) {
    return (
      <div>
        <AdvancedSearchTitle searchType={props.search.searchType} />
        <div id='advanced-search'>
          <div className='asleft'>
            <AdvancedSearchField id={0} />
            <Bool id='bool_0' />
            <AdvancedSearchField id={1} />
            <Bool id='bool_1' />
            <AdvancedSearchField id={2} />
          </div>
          <div className='asright'>
            <fieldset>
              <MaterialType />
              <Language />
              <DateField id='drStart' label='Start Date' />
              <DateField id='drEnd' label='End Date' />
            </fieldset>
            <SearchScope searchType={props.search.searchType} />
          </div>
          <div className='asgo'>
            <button onClick={props.onSubmit}>Search</button>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export default AdvancedSearch
