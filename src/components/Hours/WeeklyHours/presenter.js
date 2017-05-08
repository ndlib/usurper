import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'
import WeeklyHoursList from '../WeeklyHoursList'

const Loading = (
  <span>loading</span>
)
const Loaded = (hoursEntry) => (
  <div className="service-point">
    <h4>{ hoursEntry.name }</h4>
    <WeeklyHoursList hours={ hoursEntry.thisWeek } title="Current Hours" showEffectiveDates={false} />
    <WeeklyHoursList hours={ hoursEntry.upcomingDifferentHours[0] } title="Current Hours" showEffectiveDates={false} />
    <hr />
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

const Presenter = ({ hoursEntry, jsonHoursApiKey }) => {

  if (hoursEntry.isFetching) {
    return Loading
  }
  if (!jsonHoursApiKey || !hoursEntry.json[jsonHoursApiKey]) {
    return ErrorLoading
  } else if (hoursEntry.status === 'success') {
    return Loaded(hoursEntry.json[jsonHoursApiKey])
  } else if (hoursEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}


Presenter.propTypes = {
  jsonHoursApiKey: PropTypes.string.isRequired
}

export default Presenter
