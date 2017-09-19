import React from 'react'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

export const makeEventEntry = (entry, index, showDescription = true) => {
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
        <div className='event-card-text'>

          <h3 itemProp='name'>{entry.title}</h3>
          <div className='date'>
            {
              entry.displayDate
            }
          </div>
          <div className='time'>
            {
              entry.displayTime
            }
          </div>
        </div>
        { showDescription && (
            <div className='description' itemProp='description'>
              <LibMarkdown>{entry.shortDescription}</LibMarkdown>
            </div>
          )
        }
      </Link>
    </div>
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
        entries.map(makeEventEntry)
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
