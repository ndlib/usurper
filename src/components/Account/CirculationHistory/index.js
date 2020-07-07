import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'
import { getHistorical } from 'actions/personal/loanResources'
import {
  KIND as SETTINGS_KIND,
  setCircStatus,
  getCircStatus,
} from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

export class CirculationHistoryContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.processing = React.createRef(props.processingStatus === 'inprogress')
    this.timer = setInterval(() => {
      // This interval will trigger periodically for as long as the component is alive in case of multiple
      // opt-in/opt-out operations. However, it will only do anything if circ history update is "inprogress"
      if (this.processing.current) {
        this.props.getCircStatus()
      }
    }, 5000)
  }

  checkFullyLoaded (prevProps) {
    if (this.props.loggedIn) {
      if (this.props.saveHistoryStatus === statuses.NOT_FETCHED) {
        this.props.getCircStatus()
      }
      if (this.props.optedIn && this.props.historicalStatus === statuses.NOT_FETCHED) {
        this.props.getHistorical()
      }

      if (this.props.processingStatus === 'complete' && prevProps && prevProps.processingStatus === 'inprogress') {
        this.props.getHistorical()
      }
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate (prevProps) {
    this.checkFullyLoaded(prevProps)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    this.processing.current = (this.props.optedIn && this.props.processingStatus === 'inprogress')
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
  const circInfoApiStatus = settings[SETTINGS_KIND.circStatus].state
  const circDataApiStatus = personal.historical.state
  const circStatusInfo = typy(settings[SETTINGS_KIND.circStatus], 'data').safeObjectOrEmpty
  const optedIn = circStatusInfo.saveHistory || circDataApiStatus === statuses.SUCCESS
  const loading = (circDataApiStatus === statuses.NOT_FETCHED && [statuses.NOT_FETCHED, statuses.FETCHING].includes(circInfoApiStatus)) ||
    (optedIn && [statuses.NOT_FETCHED, statuses.FETCHING].includes(circDataApiStatus))

  const updateStatus = settings['update'][SETTINGS_KIND.circStatus].state
  return {
    loggedIn: !!(personal.login && personal.login.token),
    saveHistoryStatus: circInfoApiStatus,
    historicalStatus: circDataApiStatus,
    loading: loading,
    items: checkedOut,
    optedIn: optedIn,
    processingStatus: (circInfoApiStatus === statuses.FETCHING && circDataApiStatus === statuses.SUCCESS) ? 'inprogress' : circStatusInfo.status,
    updateStatus: updateStatus,
    updating: updateStatus === statuses.FETCHING,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getHistorical, setCircStatus, getCircStatus }, dispatch)
}

CirculationHistoryContainer.propTypes = {
  loggedIn: PropTypes.bool,
  historicalStatus: PropTypes.string,
  saveHistoryStatus: PropTypes.string,
  loading: PropTypes.bool,
  items: PropTypes.array,
  optedIn: PropTypes.bool,
  processingStatus: PropTypes.string,
  updateStatus: PropTypes.string,
  updating: PropTypes.bool,
  getHistorical: PropTypes.func.isRequired,
  setCircStatus: PropTypes.func,
  getCircStatus: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(CirculationHistoryContainer)
