import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const News = (entries) => {
  return (
    <section className='col-md-8 col-xs-12' aria-label="News">
      <h3>News</h3>
      {
        entries.map((entry) => {
          return (
            <Link key={entry.fields.slug} title={entry.fields.title} to={'/news/' + entry.fields.slug}>
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
  )
}

export default News
