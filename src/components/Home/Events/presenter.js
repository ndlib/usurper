import React from 'react'
import { makeEventEntry } from '../../LandingPages/Events/presenter'
import './style.css'

const Events = (entries) => {
  return (
    <div className='col-md-4 col-xs-12' >
      <h3>Events</h3>
      <section aria-label='Events'>
        {
          entries.map(makeEventEntry)
        }
      </section>
    </div>
  )
}

export default Events
