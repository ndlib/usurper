import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchHours } from '../../../actions/hours'
import { fetchServicePoints } from '../../../actions/contentful/servicePoints'
import HoursPagePresenter from './presenter.js'
import PresenterFactory from '../../APIPresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { flattenLocale } from '../../../shared/ContentfulLibs'

const mapStateToProps = (state) => {
  let combinedStatus = statuses.NOT_FETCHED
  if (state.cfServicePoints.status === statuses.SUCCESS && state.hours.status === statuses.SUCCESS) {
    combinedStatus = statuses.SUCCESS
  } else if (state.cfServicePoints.status === statuses.ERROR || state.hours.status === statuses.ERROR) {
    combinedStatus = statuses.ERROR
  }

  let servicePointsWithHours = []
  if (combinedStatus === statuses.SUCCESS) {
    servicePointsWithHours = state.cfServicePoints.json
      .filter((servicePoint) => servicePoint.fields.hoursCode)
      .map((servicePoint) => {
        flattenLocale(servicePoint.fields, 'en-US')
        return servicePoint
      })
  }
  return {
    combinedStatus,
    hoursStatus: state.hours.status,
    servicePointsStatus: state.cfServicePoints.status,
    servicePointsWithHours,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours, fetchServicePoints }, dispatch)
}

export class HoursPageContainer extends Component {
  componentDidMount () {
    if (this.props.hoursStatus === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      this.props.fetchServicePoints('publish')
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={HoursPagePresenter}
        props={this.props.servicePointsWithHours}
        status={this.props.combinedStatus} />
    )
  }
}

PropTypes.propTypes = {
  hoursStatus: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
  servicePointsStatus: PropTypes.string.isRequired,
  fetchServicePoints: PropTypes.func.isRequired,
  combinedStatus: PropTypes.string.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursPageContainer)

export default HoursPage
