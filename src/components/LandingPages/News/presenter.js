import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import './style.css'

export const makeNewsEntry = (entry, index) => {
  return (
    <div
      className='news-card'
      itemScope
      itemType='http://schema.org/NewsArticle'
      key={'news_' + index}
    >
      <Link
        ariaLabel={entry.fields.title}
        to={'/news/' + entry.fields.slug}
        itemProp='mainEntityOfPage'
      >
        <Image cfImage={entry.fields.image} itemProp='image' />
        <header>
          <h3 itemProp='headline'>{entry.fields.title}</h3>
        </header>
        <div className='description' itemProp='description'>
          <LibMarkdown>{entry.fields.shortDescription}</LibMarkdown>
        </div>
      </Link>
    </div>
  )
}

const News = (entries) => {
  return (
    <div className='col-md-8 col-xs-12'>
      <PageTitle title='News' />
      <SearchProgramaticSet open={false} />
      <section aria-label='News'>
        {
          entries.map(makeNewsEntry)
        }
      </section>
    </div>
  )
}

export default News
