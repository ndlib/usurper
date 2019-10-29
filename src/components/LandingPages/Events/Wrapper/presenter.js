import React from 'react'
import PropTypes from 'prop-types'

import ActiveFilters from './ActiveFilters'
import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'
import Facet from 'components/Interactive/Facet'
import Config from 'shared/Configuration'

import './style.css'

// These should exactly match the validations in the Contentful model
const AUDIENCES = [
  'Undergraduates',
  'Graduate Students',
  'Faculty',
  'Staff',
  'Postdocs',
  'Public, Alumni, & Friends',
].map(value => ({ // Facet expects key value pairs, but in this case the display value and key are the same
  key: value,
  value: value,
}))

const TYPES = [
  'Discussion',
  'Exhibit',
  'Hands-On Lab',
  'Lecture/Seminar',
  'Research/Writing Camp',
  'Workshop',
  'Study Break',
  'Special Event',
].map(value => ({
  key: value,
  value: value,
}))

const Presenter = (props) => {
  return (
    <div className='content'>
      <Link to={props.linkPath} className='button fright tab'>{props.linkText}</Link>
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 col-xs-12 events-list'>
          <FilterBox value={props.filterValue} title='Search Events' onChange={props.onFilterChange} />
          { Config.features.eventsFilteringEnabled && (props.audienceFilter.length > 0 || props.typeFilter.length > 0) && (
            <ActiveFilters audienceFilter={props.audienceFilter} typeFilter={props.typeFilter} onRemove={props.onFacetRemove} />
          )}
          <br />
          { props.events.map((event, index) => (
            <EventCard key={event.id} entry={event} isLast={index === props.events.length - 1} onTagClick={props.onFacetApply} />
          ))}
          {
            props.filterValue && props.events.length === 50 && (
              <div className='searchClipped'>
                <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
              </div>
            )
          }
        </div>
        <div className='col-md-4 col-sm-5 col-xs-12 right events-sidebar'>
          { props.children }
          { Config.features.eventsFilteringEnabled && (
            <React.Fragment>
              <Facet
                name='audience'
                options={AUDIENCES}
                selectedValues={props.audienceFilter}
                onChangeCallback={props.onFacetApply}
              />
              <Facet
                name='type'
                options={TYPES}
                selectedValues={props.typeFilter}
                onChangeCallback={props.onFacetApply}
              />
            </React.Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

Presenter.propTypes = {
  linkPath: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  onFacetApply: PropTypes.func.isRequired,
  onFacetRemove: PropTypes.func.isRequired,
  audienceFilter: PropTypes.array,
  typeFilter: PropTypes.array,
  children: PropTypes.any,
}

export default Presenter
