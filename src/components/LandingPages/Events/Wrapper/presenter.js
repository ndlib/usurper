import React from 'react'
import PropTypes from 'prop-types'

import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'

import './style.css'

const Presenter = (props) => {
  return (
    <div className='content'>
      <Link to={props.linkPath} className='button fright tab'>{props.linkText}</Link>
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 col-xs-12'>
          <FilterBox value={props.filterValue} title='Search Events' onChange={props.onFilterChange} />
          <br />
          { props.events.map((event, index) => (
            <EventCard key={event.id} entry={event} isLast={index === props.events.length - 1} />
          ))}
          {
            props.filterValue && props.events.length === 50 && (
              <div className='searchClipped'>
                <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
              </div>
            )
          }
        </div>
        {props.children}
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
  children: PropTypes.any,
}

export default Presenter
