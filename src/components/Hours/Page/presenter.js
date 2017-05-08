import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import WeeklyHours from '../WeeklyHours'

const Loading = (
  <span>loading</span>
);
const Loaded = (hoursEntry) => (
  <div>
    <h2>Hours</h2>
    <hr />
    <div>
      <p>View building and service desk hours.</p>
    </div>
    {
      Object.keys(hoursEntry).map(function(hours, key) {
        return (<WeeklyHours jsonHoursApiKey={ key } />)
      })
    }
  </div>
);
const NotFound = (
  <div className={'NotFound'}>
    <h1>Page Not Found</h1>
    <div>The requested page could not be found</div>
  </div>
);


const Presenter = ({ hoursEntry }) => {
  switch(hoursEntry.status) {
    case "fetching":
      return Loading;
    case "success":
      return Loaded(hours);
    default:
      return NotFound
  }
}

Presenter.propTypes = {
  jsonHoursApiKey: PropTypes.string.isRequired
}

export default Presenter
