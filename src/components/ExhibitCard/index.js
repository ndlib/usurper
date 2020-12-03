import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import Image from 'components/Image'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'

import './style.css'

export const ExhibitCard = ({ entry, horizontal, showDetails }) => {
  const event = typy(entry.event).safeObjectOrEmpty
  return (
    <div className={'exhibit-card' + (horizontal ? ' horizontal' : '')}>
      <Link to={entry.linkTo} ariaLabel={entry.title}>
        <Image cfImage={entry.image} className='exhibit-image' containerClassName='exhibit-image-container'>
          {entry.type} Exhibit
        </Image>
      </Link>
      <div className='card-text'>
        <Link to={entry.linkTo} ariaLabel={entry.title}>
          { showDetails && (
            <div className='date'>
              {event.displayDate}
            </div>
          )}
          { showDetails && event.displayTime && (
            <div className='time'>
              {event.displayTime}
            </div>
          )}
          <h2>{entry.title}</h2>
        </Link>
        { showDetails && event.shortDescription && (
          <div className='description'>
            <LibMarkdown>{event.shortDescription}</LibMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

ExhibitCard.propTypes = {
  entry: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string.isRequired,
    type: PropTypes.string,
    event: PropTypes.shape({
      shortDescription: PropTypes.string,
      displayDate: PropTypes.string,
      displayTime: PropTypes.string,
    }),
    linkTo: PropTypes.string.isRequired,
    image: PropTypes.object,
  }).isRequired,
  horizontal: PropTypes.bool,
  showDetails: PropTypes.bool,
}

export default ExhibitCard
