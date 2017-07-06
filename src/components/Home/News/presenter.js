import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const News = (entries) => {
  return (
    <div className='col-md-8 col-xs-12'>
      <h3>News</h3>
      <section aria-label='News'>
        {
          entries.map((entry) => {
            return (
              <Link key={entry.fields.slug} ariaLabel={entry.fields.title} to={'/news/' + entry.fields.slug}>
                <div className='news-card'>
                  <Image cfImage={entry.fields.image} />
                  <header>
                    <h3>{entry.fields.title}</h3>
                  </header>
                  <div className='description'>
                    <LibMarkdown>{entry.fields.shortDescription}</LibMarkdown>
                  </div>
                </div>
              </Link>
            )
          })
        }
      </section>
    </div>
  )
}

export default News
