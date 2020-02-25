import React from 'react'
import PropTypes from 'prop-types'

import RecurringIndicator from 'components/Contentful/Event/RecurringIndicator'
import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'
import { TYPE_FACET } from 'components/LandingPages/Events/facets'

import './style.css'

const EventCard = ({ entry, showDescription, showImage, showTags, onTagClick }) => {
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
        { showImage && (
          <Link ariaLabel={linkAriaLabel} to={linkPath}>
            <Image cfImage={entry.representationalImage} itemProp='image' />
          </Link>
        )}
      </div>
      <div className='card-text'>
        <Link ariaLabel={linkAriaLabel} to={linkPath}>
          <div className='date'>
            {entry.displayDate}
          </div>
          { entry.displayTime && (
            <div className='time'>
              {entry.displayTime}
            </div>
          )}
          <h2 itemProp='name'>{entry.title}</h2>
          <RecurringIndicator entry={entry} />
        </Link>
        { showDescription && (
          <div className='description' itemProp='description'>
            <LibMarkdown>{entry.shortDescription}</LibMarkdown>
          </div>
        )}
        { showTags && (
          <Tags groups={[typeTag]} />
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
  showDescription: PropTypes.bool,
  showImage: PropTypes.bool,
  showTags: PropTypes.bool,
  onTagClick: PropTypes.func,
}

EventCard.defaultProps = {
  showDescription: true,
  showImage: true,
  showTags: true,
}

export default EventCard
