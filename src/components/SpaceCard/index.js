import React from 'react'
import PropTypes from 'prop-types'

import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'

import './style.css'

const SpaceCard = ({ entry, onTagClick }) => {
  const featureTags = entry.fields.features ? entry.fields.features.map(feature => ({
    key: feature,
    value: feature,
    onClick: (tag) => onTagClick('feature', [ tag.key ]),
  })) : null

  return (
    <div className='space-card'>
      <div className='card-image'>
        <Image cfImage={entry.fields.photo} itemProp='image' />
      </div>
      <div className='card-text'>
        <h2 itemProp='name'>{entry.fields.title}</h2>
        {entry.fields.reservationUrl && (
          <Link to={entry.fields.reservationUrl} className='reserve-link'>
            Reserve Space
          </Link>
        )}
        {entry.fields.floor && (
          <Link to={`floor/${entry.fields.floor.fields.slug}`} className='reserve-link'>
            Floor Map - {entry.fields.floor.fields.title}
          </Link>
        )}
        <div className='description' itemProp='description'>
          <LibMarkdown>{entry.fields.description}</LibMarkdown>
        </div>
        <Tags groups={[featureTags]} />
      </div>
    </div>
  )
}

SpaceCard.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      photo: PropTypes.object,
      floor: PropTypes.shape({
        fields: PropTypes.shape({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        }).isRequired,
      }),
    }).isRequired,
  }).isRequired,
  onTagClick: PropTypes.func,
}

export default SpaceCard
