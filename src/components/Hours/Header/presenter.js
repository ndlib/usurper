import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'

const Loading = (
  <span>loading</span>
)
const Loaded = (hoursEntry) => (
  <div className="header-hours">
    <p>{ hoursEntry.hesburghlibrariesservicepoints.name }: <a href="/hours">{ hoursEntry.hesburghlibrariesservicepoints.today.display }</a></p>
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
  if (hoursEntry.status === 'success') {
    return Loaded(hoursEntry.json)
  } else if (hoursEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}

export default Presenter
