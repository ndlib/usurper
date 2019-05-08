import React from 'react'
import { makeNewsEntry } from '../../LandingPages/News/presenter'
import './style.css'
import Link from 'components/Interactive/Link'
import ErrorBoundary from 'components/ErrorBoundary'

const News = (entries) => {
  return (
    <div className='col-md-6 col-xs-12'>
      <section aria-label='News'>
        <Link to='/news' className='newsEventHeader'><h1>News</h1></Link>
        <ErrorBoundary>
          {
            entries.map(makeNewsEntry)
          }
        </ErrorBoundary>
        <Link to='/news' className='newsEventsLink viewAll'>View All News</Link>
      </section>
    </div>
  )
}

export default News
