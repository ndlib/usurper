import React from 'react'
import './style.css'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import Image from '../../Image'

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
        {
          showImage && <Image cfImage={entry.representationalImage} className='card-image' />
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
        <h4 itemProp='name'>{entry.title}</h4>

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
      <Link to='/events' className='newsEventHeader'><h2>Events</h2></Link>
      <section aria-label='Events'>
        {
          entries.map((entry, index) => makeEventEntry(entry, index, index === entries.length - 1, false, false))
        }
      </section>
      <Link to='/events' className='newsEventsLink viewAll'>View All Events</Link>
    </div>
  )
}

export default Events
