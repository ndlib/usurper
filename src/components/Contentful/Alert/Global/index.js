import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'
import { fetchAllAlerts } from 'actions/contentful/allAlerts'
import { getHiddenAlerts } from 'actions/personal/settings'
import { alertMap, alertSort, alertCatagorize } from '../alertHelpers.js'
import Presenter from '../presenter.js'
import * as statuses from 'constants/APIStatuses'
import makeAlertSelector from 'selectors/alerts'
import { withErrorBoundary } from 'components/ErrorBoundary'

const mapStateToProps = (state) => {
  const { personal, settings } = state
  const alertSelector = makeAlertSelector()
  const selected = alertSelector(state)

  let alerts = []
  selected.forEach((entry) => {
    alerts.push(alertMap({
      id: entry.sys.id,
      ...entry.fields,
    }, true))
  })

  alerts.sort(alertSort)

  alerts = alertCatagorize(alerts)

  return {
    allAlerts: alerts,
    allAlertsStatus: state.allAlerts ? state.allAlerts.status : '',
    hiddenAlerts: settings.hiddenAlerts,
    isLoggedIn: !!(personal.login.token),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllAlerts, getHiddenAlerts }, dispatch)
}

export class AllAlertsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    if (this.props.allAlertsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllAlerts('publish')
    }
    if (this.props.isLoggedIn && this.props.hiddenAlerts.state === statuses.NOT_FETCHED) {
      this.props.getHiddenAlerts()
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    if (this.props.allAlertsStatus === statuses.SUCCESS && [statuses.SUCCESS, statuses.ERROR].includes(this.props.hiddenAlerts.state)) {
      return <Presenter alerts={this.props.allAlerts} hiddenIds={typy(this.props.hiddenAlerts, 'data').safeArray} />
    }
    return null
  }
}

AllAlertsContainer.propTypes = {
  allAlertsStatus: PropTypes.string,
  fetchAllAlerts: PropTypes.func.isRequired,
  getHiddenAlerts: PropTypes.func.isRequired,
  allAlerts: PropTypes.object,
  hiddenAlerts: PropTypes.shape({
    data: PropTypes.array,
    state: PropTypes.string.isRequired,
  }),
  isLoggedIn: PropTypes.bool.isRequired,
}

const Alerts = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllAlertsContainer)

export default withErrorBoundary(Alerts)
