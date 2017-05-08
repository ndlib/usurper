import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { Link } from 'react-router-dom'

const Loading = (
  <span>loading</span>
);
const ErrorLoading = (
  <span>Error</span>
);
const NotFound = (
  <div>Not Found</div>
);
const Loaded = (hoursEntry) => (
  <div className="header-hours">
    <p>{ hoursEntry.name }: <a href="/hours">{ hoursEntry.today.display }</a></p>
  </div>
);

const Presenter = ({ hoursEntry, jsonHoursApiKey }) => {
  switch(hoursEntry.status) {
    case "fetching":
      return Loading;
    case "success":
      let hours = hoursEntry.json[jsonHoursApiKey];
      if (hours) {
        return Loaded(hours);
      } else {
        return NotFound;
      }
    default:
      return ErrorLoading
  }
}

Presenter.propTypes = {
  jsonHoursApiKey: PropTypes.string.isRequired
}

export default Presenter
