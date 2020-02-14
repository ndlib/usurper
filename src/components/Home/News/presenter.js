import React from 'react'
import NewsCard from 'components/NewsCard'
import Link from 'components/Interactive/Link'

import './style.css'

const News = (entries) => {
  return (
    <div className='col-md-6 col-xs-12'>
      <section aria-label='News' className='newsSection'>
        <Link to='/news' className='newsEventHeader'><h1>News</h1></Link>
        <div className='newsList'>
          {entries.map(entry => <NewsCard key={entry.sys.id} entry={entry} />)}
        </div>
        <Link to='/news' className='newsEventsLink viewAll'>View All News</Link>
      </section>
    </div>
  )
}

export default News
