import React from 'react'
import './style.css'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import ErrorBoundary from 'components/ErrorBoundary'
export const makeEventEntry = (entry, index, isLast = false, showDescription = true, showImage = true) => {
  return (
    <div
      className='event-card'
      itemScope
      itemType='http://schema.org/Event'
      key={'events_' + index}
    >
      <Link
        ariaLabel={entry.title + ' on ' + entry.displayDate + ' at ' + entry.displayTime}
        to={'/event/' + entry.slug}
        itemProp='mainEntityOfPage'
      >
        <meta itemProp='startDate' content={entry.startDate} />
        <meta itemProp='endDate' content={entry.endDate} />
        <div itemProp='location' itemScope itemType='http://schema.org/Place' hidden>
          <meta itemProp='address' content={entry.locationText} />
        </div>
        {
          showImage && <Image cfImage={entry.representationalImage} className='card-image' itemProp='image' />
        }
        <div className='date'>
          {
            entry.displayDate
          }
        </div>
        { entry.displayTime && (
          <div className='time'>
            {
              entry.displayTime
            }
          </div>
        )
        }
        <h2 itemProp='name'>{entry.title}</h2>

        { showDescription && (
          <div className='description' itemProp='description'>
            <LibMarkdown>{entry.shortDescription}</LibMarkdown>
          </div>
        )
        }
      </Link>
      { !isLast && <hr /> }
    </div>
  )
}

const Events = (entries) => {
  return (
    <div className='col-md-5 col-xs-12' >
      <section aria-label='Events'>
        <Link to='/events' className='newsEventHeader'><h1>Events</h1></Link>
        <ErrorBoundary>
          {
            entries.map((entry, index) => makeEventEntry(entry, index, index === entries.length - 1, false, false))
          }
        </ErrorBoundary>
        <Link to='/events' className='newsEventsLink viewAll'>View All Events</Link>
      </section>
    </div>
  )
}

export default Events
