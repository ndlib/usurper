import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Presenter from '../presenter'
import { alertMap, alertSort, alertCatagorize } from '../alertHelpers.js'

const mapStateToProps = (state, ownProps) => {
  let alerts = []

  if (ownProps.alert) {
    let alert = ownProps.alert.fields

    let now = new Date()
    let start = new Date(alert.startTime)
    let end = new Date(alert.endTime)
    if (start <= now && end >= now) {
      alerts.push(alertMap(alert))
    }

    alerts.sort(alertSort)

    alerts = alertCatagorize(alerts)
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
  alerts: PropTypes.object,
}

export default connect(mapStateToProps)(AlertContainer)
