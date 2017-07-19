import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllAlerts } from '../../../../actions/contentful/allAlerts'
import Presenter from '../presenter.js'
import * as statuses from '../../../../constants/APIStatuses'
import makeAlertSelector from '../../../../selectors/alerts'

const makeMapStateToProps = () => {
  const selector = makeAlertSelector()
  const mapStateToProps = (state) => {
    return {
      allAlerts: selector(state),
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
      return <Presenter globalAlerts={this.props.allAlerts} />
    }
    return null
  }
}

AllAlertsContainer.propTypes = {
  allAlertsStatus: PropTypes.string,
  fetchAllAlerts: PropTypes.func.isRequired,
  allAlerts: PropTypes.array,
}

const Alerts = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(AllAlertsContainer)

export default Alerts
