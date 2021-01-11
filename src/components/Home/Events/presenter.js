import React from 'react'
import PropTypes from 'prop-types'

import EventCard from 'components/EventCard'
import Link from 'components/Interactive/Link'
import ErrorBoundary from 'components/ErrorBoundary'

import './style.css'

const Presenter = ({ entries }) => {
  return (
    <div className='col-md-4 col-xs-12' >
      <section aria-label='Events' className='eventsSection'>
        <Link to='/events' className='newsEventHeader'><h1>Events</h1></Link>
        <hr aria-hidden='true' />
        <ErrorBoundary>
          { entries.map(entry => (
            <React.Fragment key={entry.id}>
              <EventCard entry={entry} isHome />
              <hr className='card-divider' />
            </React.Fragment>
          ))}
        </ErrorBoundary>
        <Link to='/events' className='newsEventsLink' arrow>View All Events</Link>
      </section>
    </div>
  )
}

Presenter.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
}

export default Presenter
