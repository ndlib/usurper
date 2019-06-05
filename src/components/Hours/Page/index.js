import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'
import { fetchHours } from 'actions/hours'
import { fetchServicePoints } from 'actions/contentful/servicePoints'
import { fetchSidebar } from 'actions/contentful/staticContent'
import HoursPagePresenter from './presenter.js'
import PresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'
import HoursError from '../Error'
import { withErrorBoundary } from 'components/ErrorBoundary'
import * as helper from 'constants/HelperFunctions'

const PAGE_SLUG = 'hours'
const hoursPageOrder = [
  { servicePointSlug: 'hesburghlibrary', main: true },
  { servicePointSlug: 'askusdesk', main: false },
  { servicePointSlug: 'circulationservicedesk', main: false },
  { servicePointSlug: 'course-reserves-office', main: false },
  { servicePointSlug: 'ill-office', main: false },
  { servicePointSlug: 'mediacorps', main: false },
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

const mapStateToProps = (state, ownProps) => {
  const combinedStatus = helper.reduceStatuses([
    state.cfServicePoints.status,
    state.hours.status,
    state.cfStatic.status,
  ])
  const servicePointsWithHours = combinedStatus === statuses.SUCCESS
    ? state.cfServicePoints.json
      .filter((servicePoint) => servicePoint.fields.hoursCode)
      .reduce((map, obj) => {
        map[obj.fields.slug] = obj
        return map
      }, {})
    : null

  return {
    combinedStatus,
    hoursStatus: state.hours.status,
    servicePointsStatus: state.cfServicePoints.status,
    servicePointsWithHours,
    cfStatic: state.cfStatic,
    preview: ownProps.location
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours, fetchServicePoints, fetchSidebar }, dispatch)
}

export class HoursPageContainer extends Component {
  componentDidMount () {
    if (this.props.hoursStatus === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      this.props.fetchServicePoints(false)
    }
    if (this.props.cfStatic.status === statuses.NOT_FETCHED || this.props.cfStatic.slug !== PAGE_SLUG) {
      this.props.fetchSidebar(PAGE_SLUG, this.props.preview)
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={HoursPagePresenter}
        error={HoursError}
        props={{
          servicePoints: this.props.servicePointsWithHours,
          preview: this.props.preview,
          hoursPageOrder: hoursPageOrder,
          title: typy(this.props.cfStatic, 'json.fields.title').safeString,
        }}
        status={this.props.combinedStatus} />
    )
  }
}

HoursPageContainer.propTypes = {
  hoursStatus: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
  servicePointsStatus: PropTypes.string.isRequired,
  servicePointsWithHours: PropTypes.object,
  cfStatic: PropTypes.shape({
    status: PropTypes.string,
    slug: PropTypes.string,
    json: PropTypes.shape({
      fields: PropTypes.shape({
        title: PropTypes.string,
      }),
    }),
  }),
  fetchServicePoints: PropTypes.func.isRequired,
  fetchSidebar: PropTypes.func.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursPageContainer)

export default withErrorBoundary(HoursPage)
