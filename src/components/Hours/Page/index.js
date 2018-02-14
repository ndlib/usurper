import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchHours } from '../../../actions/hours'
import { fetchServicePoints } from '../../../actions/contentful/servicePoints'
import HoursPagePresenter from './presenter.js'
import PresenterFactory from '../../APIPresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import HoursError from '../Error'

const hoursPageOrder = [
  { servicePointSlug: 'hesburghlibrary', main: true },
  { servicePointSlug: 'askusdesk', main: false },
  { servicePointSlug: 'circulationservicedesk', main: false },
  { servicePointSlug: 'oitoutpost', main: false },
  { servicePointSlug: 'reservesmicrotextandmediadesk', main: false },
  { servicePointSlug: 'architecturelibrary', main: true },
  { servicePointSlug: 'mahaffeybusinesslibrary', main: true },
  { servicePointSlug: 'centerfordigitalscholarship', main: true },
  { servicePointSlug: 'chemistryphysicslibrary', main: true },
  { servicePointSlug: 'engineeringlibrary', main: true },
  { servicePointSlug: 'kelloggkroclibrary', main: true },
  { servicePointSlug: 'omearamathematicslibrary', main:true },
  { servicePointSlug: 'medievalinstitutelibrary', main: true },
  { servicePointSlug: 'byzantinestudiesreadingroom', main: false },
  { servicePointSlug: 'musiclibrary', main: true },
  { servicePointSlug: 'radiationchemistryreadingroom', main: true },
  { servicePointSlug: 'rarebooksspecialcollections', main: true },
  { servicePointSlug: 'universityarchives', main: true },
  { servicePointSlug: 'visualresourcescenter', main: true },
]

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

export class HoursPageContainer extends Component {
  componentDidMount () {
    if (this.props.hoursStatus === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      this.props.fetchServicePoints(false)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={HoursPagePresenter}
        error={HoursError}
        props={{
          servicePoints: this.props.servicePointsWithHours,
          preview: this.props.location ? (new URLSearchParams(this.props.location.search)).get('preview') === 'true' : false,
          hoursPageOrder: hoursPageOrder,
        }}
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
