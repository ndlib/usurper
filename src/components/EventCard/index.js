import React from 'react'
import PropTypes from 'prop-types'

import RecurringIndicator from 'components/Contentful/Event/RecurringIndicator'
import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'
import { TYPE_FACET } from 'components/LandingPages/Events/facets'
import { shortMonth } from 'constants/staticData'

import './style.css'

const EventCard = ({ entry, isHome, onTagClick }) => {
  const linkAriaLabel = entry.title + ' on ' + entry.displayDate + ' at ' + entry.displayTime
  const linkPath = '/event/' + entry.slug + (entry.recurrenceDate ? `/${entry.recurrenceDate}` : '')

  const typeTag = entry.type ? {
    key: entry.type,
    value: entry.type,
    onClick: (tag) => onTagClick(TYPE_FACET.key, [ tag.key ]),
  } : null

  return (
    <div className='event-card' itemScope itemType='http://schema.org/Event' itemProp='mainEntityOfPage'>
      <meta itemProp='startDate' content={entry.startDate} />
      <meta itemProp='endDate' content={entry.endDate} />
      <div itemProp='location' itemScope itemType='http://schema.org/Place' hidden>
        <meta itemProp='address' content={entry.locationText} />
      </div>
      <div className='card-image'>
        { !isHome && (
          <Link ariaLabel={linkAriaLabel} to={linkPath}>
            <Image cfImage={entry.representationalImage} itemProp='image' />
          </Link>
        )}
      </div>
      <div className='card-text'>
        <Link className='linkArea' ariaLabel={linkAriaLabel} to={linkPath}>
          { isHome ? (
            <div className='dateBlock'>
              <span className='dateNum'>{entry.startDate.getDate()}</span>
              <span className='dateMonth'>{shortMonth[entry.startDate.getMonth()]}</span>
            </div>
          ) : (
            <React.Fragment>
              <div className='date'>
                {entry.displayDate}
              </div>
              { entry.displayTime && (
                <div className='time'>
                  {entry.displayTime}
                </div>
              )}
            </React.Fragment>
          )}
          <div>
            <h2 itemProp='name'>{entry.title}</h2>
            <RecurringIndicator entry={entry} />
          </div>
        </Link>
        { !isHome && (
          <React.Fragment>
            <div className='description' itemProp='description'>
              <LibMarkdown>{entry.shortDescription}</LibMarkdown>
            </div>
            <Tags groups={[typeTag]} />
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

EventCard.propTypes = {
  entry: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string,
    displayDate: PropTypes.string,
    displayTime: PropTypes.string,
    locationText: PropTypes.string,
    representationalImage: PropTypes.object,
    audience: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
  }).isRequired,
  isHome: PropTypes.bool,
  onTagClick: PropTypes.func,
}

export default EventCard
