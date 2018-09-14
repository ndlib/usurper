import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllAlerts } from '../../../../actions/contentful/allAlerts'
import { alertMap, alertSort, alertCatagorize } from '../alertHelpers.js'
import Presenter from '../presenter.js'
import * as statuses from '../../../../constants/APIStatuses'
import makeAlertSelector from '../../../../selectors/alerts'
import { withErrorBoundary } from '../../../ErrorBoundary'

const makeMapStateToProps = () => {
  const selector = makeAlertSelector()

  const mapStateToProps = (state) => {
    let selected = selector(state)

    let alerts = []
    selected.forEach((entry) => {
      let alert = entry.fields
      alerts.push(alertMap(alert, true))
    })

    alerts.sort(alertSort)

    alerts = alertCatagorize(alerts)

    return {
      allAlerts: alerts,
      allAlertsStatus: state.allAlerts ? state.allAlerts.status : '',
    }
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllAlerts }, dispatch)
}

export class AllAlertsContainer extends Component {
  componentDidMount () {
    if (this.props.allAlertsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllAlerts('publish')
    }
  }

  render () {
    if (this.props.allAlertsStatus === statuses.SUCCESS) {
      return <Presenter alerts={this.props.allAlerts} />
    }
    return null
  }
}

AllAlertsContainer.propTypes = {
  allAlertsStatus: PropTypes.string,
  fetchAllAlerts: PropTypes.func.isRequired,
  allAlerts: PropTypes.object,
}

const Alerts = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(AllAlertsContainer)

export default withErrorBoundary(Alerts)
