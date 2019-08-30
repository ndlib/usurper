import React from 'react'

import Event from 'components/Event'
import Link from 'components/Interactive/Link'
import ErrorBoundary from 'components/ErrorBoundary'

import './style.css'

const Events = (entries) => {
  return (
    <div className='col-md-5 col-xs-12' >
      <section aria-label='Events'>
        <Link to='/events' className='newsEventHeader'><h1>Events</h1></Link>
        <ErrorBoundary>
          { entries.map((entry, index) => (
            <Event
              key={entry.id}
              entry={entry}
              isLast={index === entries.length - 1}
              showDescription={false}
              showImage={false}
            />
          ))}
        </ErrorBoundary>
        <Link to='/events' className='newsEventsLink viewAll'>View All Events</Link>
      </section>
    </div>
  )
}

export default Events
