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
    <section id='drawer' role='search' aria-hidden='false'>
      <div className='appliance'>
        <form id='searchAppliance'>
          <SearchBox
            visible={!props.search.advancedSearch}
            {...props}
            currentSearch={props.currentSearch}

          />
          <AdvancedSearch visible={props.search.advancedSearch} />
          <SearchPreference
            {...props}
            currentSearch={props.currentSearch}
          />
          <AdditionalLinks {...props} />
        </form>
      </div>
    </section>
  )
}

const SearchDrawer = (props) => {
  if (props.search.drawerOpen) {
    return <Drawer {...props} />
  } else {
    return (<section id='drawer' role='search' aria-hidden='true' className='hidden' />)
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
