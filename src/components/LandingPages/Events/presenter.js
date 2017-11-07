import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

import SideNav from '../../Contentful/Page/SideNav'

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

          <h4 itemProp='name'>{entry.title}</h4>
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
      <hr />
    </div>
  )
}

const makeSection = (title, entries) => {
  if (!entries || entries.length <= 0) {
    return null
  }

  return (
    <section aria-label={title} className='group'>
      <a name={encodeURIComponent(title)} />
      <h3>{title}</h3>
      {
        entries.map(makeEventEntry)
      }
    </section>
  )
}

const Events = (props) => {
  const columns = [
    {
      fields: { sections: [ { fields: { title: 'Current and Upcoming Events' } } ] },
    },
    {
      fields: { sections: [ { fields: { title: 'Past Events' } } ] },
    },
  ]
  return (
    <div className='content'>
      <PageTitle title='Events' />
      <SearchProgramaticSet open={false} />
      <div className='row landing'>
        <div className='col-md-12 col-xs-12' >
          {
            makeSection('Current and Upcoming Events', props.present)
          }
          {
            makeSection('Past Events', props.past)
          }
        </div>
      </div>
      <SideNav columns={columns} />
    </div>
  )
}

export default Events
