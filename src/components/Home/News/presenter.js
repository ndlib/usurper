import React from 'react'
import { makeNewsEntry } from '../../LandingPages/News/presenter'
import './style.css'
import Link from '../../Link'

const News = (entries) => {
  return (
    <div className='col-md-8 col-xs-12'>
      <h2>News</h2>
      <section aria-label='News'>
        {
          entries.map(makeNewsEntry)
        }
      </section>
      <Link to='/news' className='newsEventsLink'>View All News</Link>
    </div>
  )
}

export default News
