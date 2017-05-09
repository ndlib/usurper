import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Link  from '../../Link'
import * as statuses from '../../../constants/APIStatuses'

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
    <p>{ hoursEntry.name }: <Link to="/hours">{ hoursEntry.today.display }</Link></p>
  </div>
);

const Presenter = ({ hoursEntry, jsonHoursApiKey }) => {
  switch(hoursEntry.status) {
    case statuses.FETCHING:
      return Loading;
    case statuses.SUCCESS:
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
