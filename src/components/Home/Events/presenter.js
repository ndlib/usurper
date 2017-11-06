import React from 'react'
import { makeEventEntry } from '../../LandingPages/Events/presenter'
import './style.css'
import Link from '../../Link'

const Events = (entries) => {
  return (
    <div className='col-md-4 col-xs-12' >
      <h2>Events</h2>
      <section aria-label='Events'>
        {
          entries.map((entry, index) => makeEventEntry(entry, index, false))
        }
      </section>
      <Link to='/events' className='newsEventsLink'>View All Events</Link>
    </div>
  )
}

export default Events
