'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import { searchOptions } from './searchOptions.js'
import SearchPreference from './SearchPreference'
import SearchBox from './SearchBox'
import '../../static/css/global.css'
import '../../static/css/search.css'

const SearchDrawer = (props) => {
  let searchType = (props.search.hasPref && props.search.usePref) ? props.search.pref : props.search.searchType

  return (
    <div id='drawer'>
      <div className='appliance'>
        <form id='searchAppliance' method='get' action={searchOptions.find(op => op.uid === searchType).target}>
          <SearchBox
            currentSearch={searchType}
            {...props}
          />
          <SearchPreference
            currentSearch={searchType}
            {...props}
          />
          <div className='additional-links'>{ searchOptions.find(op => op.uid === searchType).additionalLinks}</div>
        </form>
      </div>
    </div>
  )
}

const Presenter = (props) => {
  if (props.search.drawerOpen) {
    return <SearchDrawer {...props} />
  } else {
    return null
  }
}

export default Presenter
