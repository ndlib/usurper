import React from 'react'
import PropTypes from 'prop-types'
import Presenter from '../presenter'
import { alertMap, alertSort, alertCategorize } from '../alertHelpers.js'

export const PageAlerts = (props) => {
  const alerts = []
  if (props.alerts) {
    const now = new Date()

    props.alerts.forEach((entry) => {
      const start = new Date(entry.fields.startTime)
      const end = new Date(entry.fields.endTime)
      if (start <= now && end >= now) {
        alerts.push(alertMap(entry))
      }
    })

    alerts.sort(alertSort)
  }

  return <Presenter alerts={alertCategorize(alerts)} />
}

PageAlerts.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    fields: {
      startTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]).isRequired,
      endTime: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]).isRequired,
    },
  })),
}

export default PageAlerts
