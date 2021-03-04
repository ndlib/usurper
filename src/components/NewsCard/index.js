import React from 'react'
import PropTypes from 'prop-types'

import Image from 'components/Image'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'

import './style.css'

export const NewsCard = ({ entry, isHome }) => {
  return (
    <div className={'news-card' + (isHome ? ' home' : '')} itemScope itemType='http://schema.org/NewsArticle'>
      <Link to={'/news/' + entry.fields.slug} ariaLabel={entry.fields.title} itemProp='mainEntityOfPage'>
        <Image
          cfImage={entry.fields.image}
          className='news-image'
          containerClassName='news-image-container'
          itemProp='image'
          lazy
          width={isHome ? 584 : 225}
        />
      </Link>
      <div className='card-text'>
        <Link to={'/news/' + entry.fields.slug} ariaLabel={entry.fields.title} itemProp='mainEntityOfPage'>
          <header>
            <h2 itemProp='headline'>{entry.fields.title}</h2>
          </header>
        </Link>
        { !isHome && (
          <div className='description' itemProp='description'>
            <LibMarkdown>{entry.fields.shortDescription}</LibMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

NewsCard.propTypes = {
  entry: PropTypes.shape({
    fields: PropTypes.shape({
      slug: PropTypes.string,
      title: PropTypes.string.isRequired,
      image: PropTypes.object,
      shortDescription: PropTypes.string,
    }).isRequired,
  }).isRequired,
  isHome: PropTypes.bool,
}

export default NewsCard
