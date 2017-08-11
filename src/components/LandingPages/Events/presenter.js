import React from 'react'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

const makeEntry = (entry) => {
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
        <div className='description'>
          <LibMarkdown>{entry.shortDescription}</LibMarkdown>
        </div>
      </div>
    </Link>
  )
}

const makeSection = (title, entries) => {
  if (!entries || entries.length <= 0) {
    return null
  }

  return (
    <section aria-label={title}>
      <h3>{title}</h3>
      {
        entries.map(makeEntry)
      }
    </section>
  )
}

const Events = (props) => {
  return (
    <div className='col-md-8 col-xs-12' >
      <PageTitle title='Events' />
      <SearchProgramaticSet open={false} />
      {
        makeSection('Current and Upcoming Events', props.present)
      }
      {
        makeSection('Past Events', props.past)
      }
    </div>
  )
}

export default Events
