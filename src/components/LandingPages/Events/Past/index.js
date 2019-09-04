import React from 'react'
import PropTypes from 'prop-types'

import DateFilter from './DateFilter'
import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Link from 'components/Interactive/Link'
import SideNav from 'components/Layout/Navigation/SideNav'
import FilterBox from 'components/Interactive/FilterBox'

import '../style.css'

const PastEvents = (props) => {
  return (
    <div className='content'>
      <Link to='/events' className='button fright tab'>Current Events</Link>
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-xs-12'>
          <FilterBox value={props.filterValue} title='Search Past Events' onChange={props.onFilterChange} />
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
        <div className='col-md-4 col-xs-12' style={{ position: 'relative' }}>
          <SideNav className='column-md'>
            <DateFilter events={props.allEvents} filterYear={props.filterYear} filterMonth={props.filterMonth} />
          </SideNav>
        </div>
      </div>
    </div>
  )
}

PastEvents.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array,
  allEvents: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
}

export default PastEvents
