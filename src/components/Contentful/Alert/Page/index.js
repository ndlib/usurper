import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Presenter from '../presenter'
import { alertMap, alertSort, alertCatagorize } from '../alertHelpers.js'

const mapStateToProps = (state, ownProps) => {
  let alerts = []

  if (ownProps.alerts) {
    const now = new Date()

    ownProps.alerts.forEach((entry) => {
      const alert = entry.fields

      const start = new Date(alert.startTime)
      const end = new Date(alert.endTime)
      if (start <= now && end >= now) {
        alerts.push(alertMap(alert))
      }
    })

    alerts.sort(alertSort)

    alerts = alertCatagorize(alerts)
  } else {
    alerts = {}
  }
  return {
    alerts: alerts,
  }
}

class AlertContainer extends Component {
  render () {
    return (<Presenter {...this.props} />)
  }
}

AlertContainer.propTypes = {
  alerts: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
}

export default connect(mapStateToProps)(AlertContainer)
