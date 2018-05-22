import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../../PageTitle'
import SearchProgramaticSet from '../../../SearchProgramaticSet'
import '../style.css'
import { makeEventEntry } from '../../../Home/Events/presenter'
import Link from '../../../Link'
import DateFilter from './DateFilter'
import SideNav from '../../../SideNav'

const Events = (props) => {
  return (
    <div className='content'>
      <Link to='/events' className='button fright tab'>Current Events</Link>
      <PageTitle title={props.pageTitle} />
      <SearchProgramaticSet open={false} />
      <div className='row'>
        <div className='col-md-9 col-xs-12' >
          {
            props.events.map((entry, index) => makeEventEntry(entry, index, index === props.events.length - 1))
          }
        </div>
        <SideNav className='col-md-3 col-xs-12'>
          <DateFilter eventDates={props.eventDates} callback={props.filterCallback} />
        </SideNav>
      </div>
    </div>
  )
}

Events.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array,
  eventDates: PropTypes.object.isRequired,
  filterCallback: PropTypes.func.isRequired,
}

export default Events
