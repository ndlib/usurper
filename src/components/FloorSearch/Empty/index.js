import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import { fetchServicePoints } from 'actions/contentful/servicePoints'
import PresenterFactory from 'components/APIPresenterFactory'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

export class FloorSearchEmptyContainer extends Component {
  componentDidMount () {
    if (this.props.servicePointsStatus === statuses.NOT_FETCHED) {
      const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      this.props.fetchServicePoints(preview)
    }
  }

  render () {
    return <PresenterFactory
      status={this.props.servicePointsStatus}
      presenter={Presenter}
      props={this.props}
    />
  }
}

export const mapStateToProps = (state) => {
  const points = []
  const contactPoints = ['circulationservicedesk']

  if (state.cfServicePoints.status === statuses.SUCCESS) {
    contactPoints.forEach(slug => {
      const match = typy(state, 'cfServicePoints.json').safeArray.find(el => el.fields.slug === slug)
      if (match) {
        points.push(match)
      }
    })
  }

  return {
    servicePointsStatus: state.cfServicePoints.status,
    points: points,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchServicePoints }, dispatch)
}

FloorSearchEmptyContainer.propTypes = {
  fetchServicePoints: PropTypes.func,
  servicePointsStatus: PropTypes.string,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FloorSearchEmptyContainer)
