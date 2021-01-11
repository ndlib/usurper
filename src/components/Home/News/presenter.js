import React from 'react'
import NewsCard from 'components/NewsCard'
import Link from 'components/Interactive/Link'

import './style.css'

const News = (entries) => {
  return (
    <div className='col-md-7 col-xs-12'>
      <section aria-label='News' className='newsSection'>
        <Link to='/news' className='newsEventHeader'><h1>News</h1></Link>
        <hr aria-hidden='true' />
        <div className='newsList'>
          {entries.map(entry => <NewsCard key={entry.sys.id} entry={entry} isHome />)}
        </div>
        <Link to='/news' className='newsEventsLink' arrow>View All News</Link>
      </section>
    </div>
  )
}

export default News
