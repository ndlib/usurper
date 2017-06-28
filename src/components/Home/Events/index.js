import React from 'react'
import './style.css'
const Events = () => {
  return (
    <div className='col-md-4 col-xs-12'>
      <h3>Events</h3>
      <div className='event-card'>
        <time dateTime="2014-09-24" className="date-as-calendar inline-flex">
          <span className="weekday">&nbsp;</span>
          <span className="day">&nbsp;</span>
          <span className="month">Jan-Aug</span>
          <span className="year">2017</span>
        </time>
        <div className='event-card-text'>
          <header>
            <h3>Can I use this? A Talk with Nancy Sims on Copyright for You</h3>
          </header>
          <div className='description'>
            <p>A presentation, followed by discussion, on common copyright questions and concerns.</p>
          </div>
        </div>
      </div>

      <div className='event-card'>
        <time dateTime="2014-09-24" className="date-as-calendar inline-flex">
          <span className="weekday">&nbsp;</span>
          <span className="day">19-24</span>
          <span className="month">May</span>
          <span className="year">2017</span>
        </time>
        <div className='event-card-text'>
          <header>
            <h3>Commencement 2017</h3>
          </header>
          <div className='description'>
            <p>Notre Dame Commencement Weekend.</p>
          </div>
        </div>
      </div>

      <div className='event-card'>


        <time dateTime="2014-09-24" className="date-as-calendar inline-flex">
          <span className="weekday">Wednesday</span>
          <span className="day">24</span>
          <span className="month">September</span>
          <span className="year">2017</span>
        </time>

        <div className='event-card-text'>
          <header>
            <h3>RBSC Exhibit: Preserving the Steadfastness of Your Faith</h3>
          </header>
          <div className='description'>
            <p>A Rare Books &amp; Special Collections exhibit on Catholics in the Early American Republic.                                                                                                </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events
