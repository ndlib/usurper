import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import Presenter from './presenter'
import HoursError from '../Error'
import InlineLoading from 'components/Messages/InlineLoading'
import { withErrorBoundary } from 'components/ErrorBoundary'
import { hesburghHoursCode } from 'constants/hours'
import * as statuses from 'constants/APIStatuses'

import { fetchHours } from 'actions/hours'
import makeGetHoursForServicePoint from 'selectors/hours'

export class HomePageHoursContainer extends Component {
  componentDidMount () {
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return <InlineLoading />
      case statuses.SUCCESS:
        return <Presenter hoursEntry={this.props.hoursEntry} />
      case statuses.ERROR:
        return <HoursError hoursEntry={this.props.hoursEntry} />
      default:
        return null
    }
  }
}

export const mapStateToProps = (state) => {
  const { cfPageEntry } = state
  // these props are required for the inline container.
  const props = {
    servicePoint: typy(cfPageEntry, 'json.fields.servicePoint').safeObject || {
      fields: {
        title: 'Hesburgh Library',
        hoursCode: hesburghHoursCode,
      },
    },
  }
  const selector = makeGetHoursForServicePoint()
  return {
    hoursEntry: selector(state, props), // the actual hours used in the selector.
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

HomePageHoursContainer.propTypes = {
  hoursEntry: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  fetchHours: PropTypes.func.isRequired,
}

const HomePageHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageHoursContainer)

export default withErrorBoundary(HomePageHours)
