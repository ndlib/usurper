import React from 'react'
import PropTypes from 'prop-types'

import EventCard from 'components/EventCard'
import LegacyEventCard from 'components/EventCard/Legacy'
import Link from 'components/Interactive/Link'
import ErrorBoundary from 'components/ErrorBoundary'
import Config from 'shared/Configuration'

import './style.css'

const Presenter = ({ entries }) => {
  return (
    <div className={(Config.features.exhibitsEnabled ? 'col-md-4' : 'col-md-5') + ' col-xs-12'} >
      <section aria-label='Events' className='eventsSection'>
        <Link to='/events' className='newsEventHeader'><h1>Events</h1></Link>
        { Config.features.exhibitsEnabled && (
          <hr aria-hidden='true' />
        )}
        <ErrorBoundary>
          { entries.map(entry => (
            <React.Fragment key={entry.id}>
              { Config.features.exhibitsEnabled ? (
                <EventCard entry={entry} isHome />
              ) : (
                <LegacyEventCard
                  entry={entry}
                  showDescription={false}
                  showImage={false}
                  showTags={false}
                />
              )}
              <hr className='card-divider' />
            </React.Fragment>
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
