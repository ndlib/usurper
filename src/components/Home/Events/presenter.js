import React from 'react'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const Events = (entries) => {
  return (
    <div className='col-md-4 col-xs-12' >
      <h3>Events</h3>
      <section aria-label='Events'>
        {
          entries.map((entry) => {
            return (
              <Link key={entry.slug} ariaLabel={entry.title + ' on ' + entry.displayWeekday + ', ' + entry.displayDay + ' ' + entry.displayMonth + ' ' + entry.displayYear} to={'/event/' + entry.slug}>
                <div className='event-card'>
                  <time dateTime='2014-09-24' className='date-as-calendar inline-flex'>
                    <span className='weekday'>{entry.displayWeekday}</span>
                    <span className='day'>{entry.displayDay}</span>
                    <span className='month'>{entry.displayMonth}</span>
                    <span className='year'>{entry.displayYear}</span>
                  </time>
                  <div className='event-card-text'>
                    <h3>{entry.title}</h3>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </section>
      <Link to='/events' className='newsEventsLink'>View All Events</Link>
    </div>
  )
}

export default Events
