'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import SearchPreference from './SearchPreference'
import SearchBox from './SearchBox'
import AdvancedSearch from './AdvancedSearch'
import AdditionalLinks from './AdditionalLinks'
import '../../static/css/global.css'
import '../../static/css/search.css'

const Drawer = (props) => {
  return (
    <div id='drawer'>
      <div className='appliance'>
        <form id='searchAppliance' method='get' action={props.currentSearch.target}>
          <SearchBox
            visible={!props.search.advancedSearch}
            currentSearch={props.currentSearch}
            {...props}
          />
          <AdvancedSearch visible={props.search.advancedSearch} />
          <SearchPreference
            currentSearch={props.currentSearch}
            {...props}
          />
          <AdditionalLinks {...props} />
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
      PropTypes.object,
      null,
    ]),
    searchType: PropTypes.string.isRequired,
  }),
}

export default SearchDrawer
