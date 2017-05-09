'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { searchOptions } from './searchOptions.js'
import SearchPreference from './SearchPreference'
import SearchBox from './SearchBox'
import '../../static/css/global.css'
import '../../static/css/search.css'

const SearchDrawer = ({ search, dispatch }) => {
  let searchType = (search.hasPref && search.usePref) ? search.pref : search.searchType

  return (
    <div id='drawer'>
      <div className='appliance'>
        <form id='searchAppliance' method='get' action={searchOptions.find(op => op.uid === searchType).target}>
          <SearchBox
            currentSearch={searchType}
            dispatch={dispatch}
            search={search}
          />
          <SearchPreference
            currentSearch={searchType}
            dispatch={dispatch}
            search={search}
          />
          <div className='additional-links'>{ searchOptions.find(op => op.uid === searchType).additionalLinks}</div>
        </form>
      </div>
    </div>
  )
}

SearchDrawer.propTypes = {
  search: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
export default SearchDrawer
