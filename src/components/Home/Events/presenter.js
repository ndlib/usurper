import React from 'react'
import PropTypes from 'prop-types'

import EventCard from 'components/EventCard'
import Link from 'components/Interactive/Link'
import ErrorBoundary from 'components/ErrorBoundary'

import './style.css'

const Presenter = ({ entries }) => {
  return (
    <div className='col-md-5 col-xs-12' >
      <section aria-label='Events'>
        <Link to='/events' className='newsEventHeader'><h1>Events</h1></Link>
        <ErrorBoundary>
          { entries.map((entry, index) => (
            <EventCard
              key={entry.id}
              entry={entry}
              isLast={index === entries.length - 1}
              showDescription={false}
              showImage={false}
              showTags={false}
            />
          ))}
        </ErrorBoundary>
        <Link to='/events' className='newsEventsLink viewAll'>View All Events</Link>
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
