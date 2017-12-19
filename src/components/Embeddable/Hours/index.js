import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchHours } from '../../../actions/hours'
import { fetchServicePoints } from '../../../actions/contentful/servicePoints'
import EmbeddableHoursPresenter from './presenter.js'
import PresenterFactory from '../../APIPresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { withRouter } from 'react-router'

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
      .reduce((map, obj) => {
        map[obj.fields.slug] = obj
        return map
      }, {})
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

export class EmbeddableHoursContainer extends Component {
  componentDidMount () {
    if (this.props.hoursStatus === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      this.props.fetchServicePoints(false)
    }
  }

  render () {
    console.log(this.props)
    return (
      <PresenterFactory
        presenter={EmbeddableHoursPresenter}
        props={{
          availableServicePoints: this.props.servicePointsWithHours,
          servicePointID: this.props.match.params.servicePoint,
        }}
        status={this.props.combinedStatus} />
    )
  }
}

EmbeddableHoursContainer.propTypes = {
  hoursStatus: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
  servicePointsStatus: PropTypes.string.isRequired,
  servicePointsWithHours: PropTypes.object,
  fetchServicePoints: PropTypes.func.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  match: PropTypes.object,
}

const EmbeddableHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(EmbeddableHoursContainer)

export default withRouter(EmbeddableHours)
