import React from 'react'
import PropTypes from 'prop-types'

import DateFilter from './DateFilter'
import EventsWrapper from '../Wrapper'
import SideNav from 'components/Layout/Navigation/SideNav'

const Presenter = (props) => {
  return (
    <EventsWrapper
      linkPath='/events'
      linkText='Current Events'
      pageTitle={props.pageTitle}
      pageDate={props.pageDate}
      events={props.events}
      filteredEvents={props.filteredEvents}
    >
      <div className='col-md-4 col-xs-12' style={{ position: 'relative' }}>
        <SideNav className='column-md'>
          <DateFilter events={props.events} filterYear={props.filterYear} filterMonth={props.filterMonth} />
        </SideNav>
      </div>
    </EventsWrapper>
  )
}

Presenter.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
}

export default Presenter
