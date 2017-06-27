import React from 'react'
import Image from '../../Image'
import Link from '../../Link'
import LibMarkdown from '../../LibMarkdown'
import './style.css'

const News = (entries) => {
  return (
    <div className='col-md-8 col-xs-12'>
      <h3>News</h3>
      {
        entries.map((entry) => {
          return (
            <Link key={entry.fields.slug} to={'/news/' + entry.fields.slug}>
              <div className='news-card'>
                <Image cfImage={entry.fields.image} />
                <header>
                  <h3>{entry.fields.title}</h3>
                </header>
                <div className='description'>
                  <LibMarkdown>{entry.fields.content}</LibMarkdown>
                </div>
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default News
