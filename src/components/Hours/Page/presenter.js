import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import WeeklyHours from '../WeeklyHours'

const Loading = (
  <span>loading</span>
)
const Loaded = (hoursEntry) => (
  <div>
    <h2>Hours</h2>
    <hr />
    <div>
      <p>View building and service desk hours.</p>
    </div>
    {
      Object.keys(hoursEntry) dsa.map(function(hours, key) {
        return (<WeeklyHours jsonHoursApiKey={ key } />)
      })
    }
  </div>
)


const ErrorLoading = (
  <span>Error</span>
)
const NotFound = (
  <div className={'NotFound'}>
    <h1>Page Not Found</h1>
    <div>The requested page could not be found</div>
  </div>
)


const Presenter = ({ hoursEntry }) => {

  if (hoursEntry.isFetching) {
    return Loading
  }
  console.log(hoursEntry.json)
  if (hoursEntry.status === 'success') {
    return Loaded(hoursEntry.json)
  } else if (hoursEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}

export default Presenter
