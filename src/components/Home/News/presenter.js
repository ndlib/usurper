import React from 'react'
import { makeNewsEntry } from '../../LandingPages/News/presenter'
import './style.css'

const News = (entries) => {
  return (
    <div className='col-md-8 col-xs-12'>
      <h3>News</h3>
      <section aria-label='News'>
        {
          entries.map(makeNewsEntry)
        }
      </section>
    </div>
  )
}

export default News
