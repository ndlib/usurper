import React from 'react'
import Image from 'components/Image'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
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
          <h2 itemProp='headline'>{entry.fields.title}</h2>
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
    <section className='col-md-8 col-xs-12'>
      <PageTitle title='News' />
      <SearchProgramaticSet open={false} />
      <div>
        {
          entries.map(makeNewsEntry)
        }
      </div>
    </section>
  )
}

export default News
