import React from 'react'
import PropTypes from 'prop-types'

import Calendar from './Calendar'
import Event from 'components/Event'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'

import '../style.css'

const CurrentEvents = (props) => {
  return (
    <div className='content'>
      { (props.filterDay) ? (
        <Link to='/events' className='button fright tab'>Current Events</Link>
      ) : (
        <Link to='/events/past' className='button fright tab'>Past Events</Link>
      )}
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-8 col-sm-7 col-xs-12'>
          <FilterBox value={props.filterValue} title='Search Current Events' onChange={props.onFilterChange} />
          <br />
          { props.events.map((event, index) => (
            <Event key={event.id} entry={event} isLast={index === props.events.length - 1} />
          ))}
          {
            props.filterValue && props.events.length === 50 && (
              <div className='searchClipped'>
                <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
              </div>
            )
          }
        </div>
        <div className='col-md-4 col-sm-5 col-xs-12 right'>
          <Calendar events={props.allEvents} history={props.history} match={props.match} />
        </div>
      </div>
    </div>
  )
}

CurrentEvents.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array,
  allEvents: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
  filterDay: PropTypes.number,
  history: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      date: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default CurrentEvents
