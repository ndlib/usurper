import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllAlerts } from '../../../../actions/contentful/allAlerts'
import Presenter from '../presenter.js'
import * as statuses from '../../../../constants/APIStatuses'
import { flattenLocale } from '../../../../shared/ContentfulLibs'

const mapStateToProps = (state) => {
  let allAlerts = []
  if (state.allAlerts && state.allAlerts.status === statuses.SUCCESS) {
    let now = new Date()

    allAlerts = state.allAlerts.json
      .map((entry) => {
        flattenLocale(entry.fields, 'en-US')
        return entry
      })
      .filter((entry) => {
        let start = new Date(entry.fields.startTime)
        let end = new Date(entry.fields.endTime)
        return start <= now && end >= now && entry.fields.global
      })
      .sort((left, right) => {
        let a = new Date(left.fields.startTime)
        let b = new Date(right.fields.startTime)

        if (a < b) {
          return 1
        } else if (b < a) {
          return -1
        }
        return 0
      })
  }
  return {
    allAlerts,
    allAlertsStatus: state.allAlerts.status,
  }
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
  mapStateToProps,
  mapDispatchToProps
)(AllAlertsContainer)

export default Alerts
