import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import WeeklyHours from '../WeeklyHours'
import * as statuses from '../../../constants/APIStatuses'
import NotFound from '../../Messages/NotFound'
import Loading from '../../Messages/Loading'
import Error from '../../Messages/Error'

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

const Presenter = ({ hoursEntry }) => {
  switch(hoursEntry.status) {
    case statuses.FETCHING:
      return <Loading/>
    case statuses.SUCCESS:
      return Loaded(hoursEntry)
    case statuses.NOT_FOUND:
      return <NotFound/>
    default:
      return <Error message={ 'There was an error loading the page.' }/>
  }
}

export default Presenter
