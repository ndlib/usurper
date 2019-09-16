import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import { alertMap, alertSort, alertCategorize } from '../alertHelpers.js'
import Presenter from '../presenter.js'

import { fetchAllAlerts } from 'actions/contentful/allAlerts'
import { getHiddenAlerts, setHiddenAlerts, clearUpdateSettings, KIND as SETTINGS_KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'
import makeAlertSelector from 'selectors/alerts'

export class GlobalAlertsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.clearHiddenAlerts = this.clearHiddenAlerts.bind(this)
    this.hideAlert = this.hideAlert.bind(this)

    // We are actually getting this list from the store, but use state to allow optimistic updates
    this.state = {
      hiddenAlertIds: props.hiddenAlerts.data || [],
    }
  }

  static getDerivedStateFromProps (props) {
    // This ensures that the state only gets synchronized when the store updates.
    if (props.hideAlertStatus === statuses.SUCCESS) {
      props.clearUpdateSettings(SETTINGS_KIND.hiddenAlerts)
      return {
        hiddenAlertIds: typy(props.hiddenAlerts, 'data').safeArray,
      }
    }

    return null
  }

  checkFullyLoaded (prevProps = {}) {
    if (this.props.allAlertsStatus === statuses.NOT_FETCHED) {
      const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      this.props.fetchAllAlerts(preview)
    }
    if (this.props.isLoggedIn && this.props.hiddenAlerts.state === statuses.NOT_FETCHED) {
      this.props.getHiddenAlerts()
    }
    // Once alerts and hidden ids have loaded, set state to appropriately hide them
    if (this.props.allAlertsStatus === statuses.SUCCESS && typy(this.props.hiddenAlerts, 'state').safeString === statuses.SUCCESS &&
        (prevProps.allAlertsStatus !== statuses.SUCCESS || typy(prevProps.hiddenAlerts, 'state').safeString !== statuses.SUCCESS)) {
      this.setState({
        hiddenAlertIds: typy(this.props.hiddenAlerts, 'data').safeArray,
      })
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate (prevProps) {
    this.checkFullyLoaded(prevProps)
  }

  clearHiddenAlerts () {
    this.props.setHiddenAlerts([])
    this.setState({
      hiddenAlertIds: [],
    })
  }

  hideAlert (id) {
    if (this.props.hiddenAlerts.state === statuses.SUCCESS && !this.state.hiddenAlertIds.includes(id)) {
      const newValue = this.state.hiddenAlertIds.concat([ id ])
      this.props.setHiddenAlerts(newValue)

      // State allows for a visual change before the store has finished updating, so it feels responsive
      // This must happen AFTER calling the action to do the update
      this.setState({
        hiddenAlertIds: newValue,
      })
    }
  }

  render () {
    if (this.props.allAlertsStatus === statuses.SUCCESS && (
      !this.props.isLoggedIn || [statuses.SUCCESS, statuses.ERROR].includes(this.props.hiddenAlerts.state))
    ) {
      return (
        <Presenter
          alerts={this.props.allAlerts}
          hiddenIds={this.state.hiddenAlertIds}
          clearHiddenAlerts={this.props.isLoggedIn ? this.clearHiddenAlerts : null}
          hideAlert={this.props.isLoggedIn ? this.hideAlert : null}
        />
      )
    }
    return null
  }
}

export const mapStateToProps = (state) => {
  const { personal, settings } = state
  const alertSelector = makeAlertSelector()
  const selected = alertSelector(state)

  let alerts = []
  selected.forEach((entry) => {
    alerts.push(alertMap(entry, true))
  })

  alerts.sort(alertSort)

  alerts = alertCategorize(alerts)

  return {
    allAlerts: alerts,
    allAlertsStatus: state.allAlerts.status,
    hiddenAlerts: settings.hiddenAlerts,
    hideAlertStatus: settings.update.hiddenAlerts.state,
    isLoggedIn: !!(personal.login.token),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllAlerts, getHiddenAlerts, setHiddenAlerts, clearUpdateSettings }, dispatch)
}

GlobalAlertsContainer.propTypes = {
  allAlertsStatus: PropTypes.string,
  fetchAllAlerts: PropTypes.func.isRequired,
  getHiddenAlerts: PropTypes.func.isRequired,
  setHiddenAlerts: PropTypes.func.isRequired,
  clearUpdateSettings: PropTypes.func.isRequired,
  allAlerts: PropTypes.object,
  hiddenAlerts: PropTypes.shape({
    data: PropTypes.array,
    state: PropTypes.string.isRequired,
  }),
  hideAlertStatus: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

const GlobalAlerts = connect(
  mapStateToProps,
  mapDispatchToProps
)(GlobalAlertsContainer)

export default GlobalAlerts
