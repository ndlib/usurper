import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from 'components/Interactive/Link'
import DateFilter from './DateFilter'
import SideNav from 'components/Layout/Navigation/SideNav'
import FilterBox from 'components/Interactive/FilterBox'

const Events = (props) => {
  return (
    <div className='content'>
      <Link to='/events' className='button fright tab'>Current Events</Link>
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-9 col-xs-12' >
          <FilterBox value={props.filterValue} title='Search Past Events' onChange={props.onFilterChange} />
          <br />
          {
            props.events.map((entry, index) => makeEventEntry(entry, index, index === props.events.length - 1))
          }
          {
            props.filterValue && props.events.length === 50 && (
              <div className='searchClipped'>
                <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
              </div>
            )
          }
        </div>
        <SideNav className='col-md-3 col-xs-12'>
          <DateFilter eventDates={props.eventDates} />
        </SideNav>
      </div>
    </div>
  )
}

Events.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array,
  eventDates: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filterValue: PropTypes.string,
}

export default Events
