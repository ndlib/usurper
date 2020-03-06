import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'

import './style.css'

export const LegacyNewsCard = ({ entry }) => {
  return (
    <div className='legacy-news-card' itemScope itemType='http://schema.org/NewsArticle'>
      <Link to={'/news/' + entry.fields.slug} ariaLabel={entry.fields.title} itemProp='mainEntityOfPage'>
        <Image cfImage={entry.fields.image} className='legacy-news-image' containerClassName='legacy-news-image-container' itemProp='image' />
      </Link>
      <div className='card-text'>
        <Link to={'/news/' + entry.fields.slug} ariaLabel={entry.fields.title} itemProp='mainEntityOfPage'>
          <header>
            <h2 itemProp='headline'>{entry.fields.title}</h2>
          </header>
        </Link>
        <div className='description' itemProp='description'>
          <LibMarkdown>{entry.fields.shortDescription}</LibMarkdown>
        </div>
      </div>
    </div>
  )
}

LegacyNewsCard.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string.isRequired,
      image: PropTypes.object,
      shortDescription: PropTypes.string,
    }).isRequired,
  }).isRequired,
}

export default LegacyNewsCard
