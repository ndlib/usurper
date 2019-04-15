import React from 'react'
import PropTypes from 'prop-types'
import AdvancedSearchField from './AdvancedSearchField'
import Bool from './Bool'
import MaterialType from './MaterialType'
import Language from './Language'
import DateField from './DateField'
import SearchScope from './SearchScope'
import { searchOptions } from '../../../../constants/searchOptions'

const AdvancedSearch = (props) => {
  if (!props.visible) {
    return null
  }

  const searchTypeDropdown = () => {
    const optArray = []
    for (let i = 0; i < searchOptions.length; i++) {
      const opt = searchOptions[i]
      optArray.push(<option key={opt.uid} value={opt.uid}>{opt.title}</option>)
    }
    return (
      <span className='selector'>
        <select id='advancedSearchType' defaultValue={props.search.searchType} onChange={props.dropdownOnChange}>
          {optArray}
        </select>
      </span>
    )
  }

  return (
    <div>
      <div id='advanced-search'>
        <div className='asleft'>
          <fieldset id={`exlidAdvancedSearchFieldsetDropdown`} >
            <div className='fgrid'>
              {searchTypeDropdown(props)}
            </div>
          </fieldset>
          <span className='filler' />
          <AdvancedSearchField id={0} />
          <Bool id='bool_0' />
          <AdvancedSearchField id={1} />
          <Bool id='bool_1' />
          <AdvancedSearchField id={2} />
        </div>
        <div className='asright'>
          <fieldset>
            <MaterialType searchType={props.search.searchType} />
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

AdvancedSearch.propTypes = {
  search: PropTypes.shape({
    searchType: PropTypes.string.isRequired,
  }),
  dropdownOnChange: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  onSubmit: PropTypes.func,
  visible: PropTypes.bool,
}

export default AdvancedSearch
