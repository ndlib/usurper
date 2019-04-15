
import React from 'react'
import PropTypes from 'prop-types'
import SearchPreference from './SearchPreference'
import SearchBox from './SearchBox'
import AdvancedSearch from './AdvancedSearch'
import AdditionalLinks from './AdditionalLinks'
import '../../../static/css/global.css'
import '../../../static/css/search.css'

const Drawer = (props) => {
  const sectionClasses = props.search.advancedSearch ? 'advanaced' : ''
  return (
    <section id='drawer' role='search' aria-hidden='false' className={sectionClasses}>
      <div className='appliance'>
        <form id='searchAppliance'>
          <SearchBox
            visible={!props.search.advancedSearch}
            {...props}
            currentSearch={props.currentSearch}
            id='basic-search-field'
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

Drawer.propTypes = {
  currentSearch: PropTypes.object.isRequired,
  search: PropTypes.shape({
    advancedSearch: PropTypes.bool.isRequired,
  }),
}

SearchDrawer.propTypes = {
  search: PropTypes.shape({
    drawerOpen: PropTypes.bool.isRequired,
  }),
}

export default SearchDrawer
