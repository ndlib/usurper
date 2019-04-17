import React from 'react'
import { makeNewsEntry } from '../../LandingPages/News/presenter'
import './style.css'
import Link from '../../Interactive/Link'
import ErrorBoundary from '../../ErrorBoundary'

const News = (entries) => {
  return (
    <div className='col-md-6 col-xs-12'>
      <Link to='/news' className='newsEventHeader'><h2>News</h2></Link>
      <ErrorBoundary>
        <section aria-label='News'>
          {
            entries.map(makeNewsEntry)
          }
        </section>
      </ErrorBoundary>
      <Link to='/news' className='newsEventsLink viewAll'>View All News</Link>
    </div>
  )
}

export default News
