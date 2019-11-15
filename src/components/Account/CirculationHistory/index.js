import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { getHistorical } from 'actions/personal/loanResources'
import { KIND as SETTINGS_KIND, setCircStatus } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

export class CirculationHistoryContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    // TODO: Call getCircStatus first.
    if (this.props.loggedIn && this.props.historicalStatus === statuses.NOT_FETCHED) {
      this.props.getHistorical()
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { personal, settings } = state

  let checkedOut = []
  if (personal.historical.history) {
    const keys = Object.keys(personal.historical.history)
    checkedOut = Object.values(personal.historical.history).map(function (item, index) {
      item.key = keys[index]
      return item
    })
  }

  const updateStatus = settings['update'][SETTINGS_KIND.circStatus].state
  return {
    loggedIn: !!(personal.login && personal.login.token),
    historicalStatus: personal.historical.state,
    loading: [statuses.NOT_FETCHED, statuses.FETCHING].includes(personal.historical.state),
    items: checkedOut,
    optedIn: personal.historical.state === statuses.SUCCESS ? settings[SETTINGS_KIND.circStatus].data : false,
    updateStatus: updateStatus,
    updating: updateStatus === statuses.FETCHING,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getHistorical, setCircStatus }, dispatch)
}

CirculationHistoryContainer.propTypes = {
  loggedIn: PropTypes.bool,
  historicalStatus: PropTypes.string,
  loading: PropTypes.bool,
  items: PropTypes.array,
  optedIn: PropTypes.bool,
  updateStatus: PropTypes.string,
  updating: PropTypes.bool,
  getHistorical: PropTypes.func.isRequired,
  setCircStatus: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CirculationHistoryContainer)
