import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import HoursPagePresenter from './presenter'
import HoursError from '../Error'
import PresenterFactory from 'components/APIPresenterFactory'
import { withErrorBoundary } from 'components/ErrorBoundary'

import { fetchHours } from 'actions/hours'
import { fetchServicePoints } from 'actions/contentful/servicePoints'
import { fetchSidebar } from 'actions/contentful/staticContent'
import { hoursPageSlug, hoursPageOrder } from 'constants/hours'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class HoursPageContainer extends Component {
  componentDidMount () {
    if (this.props.hoursStatus === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      this.props.fetchServicePoints(this.props.preview)
    }
    if (this.props.cfStatic.status === statuses.NOT_FETCHED || this.props.cfStatic.slug !== hoursPageSlug) {
      this.props.fetchSidebar(hoursPageSlug, this.props.preview)
    }
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.hash !== prevProps.location.hash ||
        (this.props.combinedStatus === statuses.SUCCESS && prevProps.combinedStatus !== statuses.SUCCESS)) {
      const element = document.getElementById(this.props.location.hash.slice(1))
      if (element) {
        const offset = element.getBoundingClientRect().top
        window.scroll(0, offset)
      }
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
          anchorSlug: typy(this.props.location, 'hash').safeString.slice(1),
        }}
        status={this.props.combinedStatus} />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const combinedStatus = helper.reduceStatuses([
    state.cfServicePoints.status,
    state.hours.status,
    state.cfStatic.status,
  ])
  const servicePointsWithHours = combinedStatus === statuses.SUCCESS
    ? typy(state.cfServicePoints, 'json').safeArray
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

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours, fetchServicePoints, fetchSidebar }, dispatch)
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
    hash: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursPageContainer)

export default withErrorBoundary(HoursPage)
