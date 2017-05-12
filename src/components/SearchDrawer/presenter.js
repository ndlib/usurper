'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchPreference from './SearchPreference'
import SearchBox from './SearchBox'
import '../../static/css/global.css'
import '../../static/css/search.css'

const Drawer = (props) => {
  return (
    <div id='drawer'>
      <div className='appliance'>
        <form id='searchAppliance' method='get' action={props.currentSearch.target}>
          <SearchBox
            currentSearch={props.currentSearch}
            {...props}
          />
          <SearchPreference
            currentSearch={props.currentSearch}
            {...props}
          />
          <div className='additional-links'>{ props.currentSearch.additionalLinks}</div>
        </form>
      </div>
    </div>
  )
}

const SearchDrawer = (props) => {
  if (props.search.drawerOpen) {
    return <Drawer {...props} />
  } else {
    return null
  }
}

SearchDrawer.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  search: PropTypes.shape({
    drawerOpen: PropTypes.bool.isRequired,
    hasPref: PropTypes.bool.isRequired,
    usePref: PropTypes.bool.isRequired,
    pref: PropTypes.oneOfType([
      PropTypes.string,
      null,
    ]),
    searchType: PropTypes.string.isRequired,
  }),
}

export default SearchDrawer
