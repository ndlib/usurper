import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import * as statuses from '../../../constants/APIStatuses'
import Link from '../../Link'

const Loading = (
  <span>loading</span>
)
const ErrorLoading = (
  <span>Error</span>
)
const NotFound = (
  <div>Not Found</div>
)
const Loaded = (hoursEntry) => (
  <div className='hours-display'>
    <p>Hours Today: <Link to='hours'>{hoursEntry.today.display}</Link></p>
  </div>
)

const Presenter = ({ hoursEntry, jsonHoursApiKey }) => {
  switch (hoursEntry.status) {
    case statuses.FETCHING:
      return Loading
    case statuses.SUCCESS:
      return Loaded(hoursEntry.json)
    case statuses.NOT_FOUND:
      return NotFound
    default:
      return ErrorLoading
  }
}

Presenter.propTypes = {
  jsonHoursApiKey: PropTypes.string.isRequired,
}

export default Presenter
