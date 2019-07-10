import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import { fetchHours } from 'actions/hours'
import HoursHomePagePresenter from './presenter.js'
import makeGetHoursForServicePoint from 'selectors/hours'
import * as statuses from 'constants/APIStatuses'
import InlineContainer from '../InlineContainer'
import { withErrorBoundary } from 'components/ErrorBoundary'

export const HESBURGH_LIBRARY_HOURS_CODE = '426'

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
export const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state) => {
    const { cfPageEntry } = state
    // these props are required for the inline container.
    const props = {
      servicePoint: typy(cfPageEntry, 'json.fields.servicePoint').safeObject || {
        fields: {
          title: 'Hesburgh Library',
          hoursCode: HESBURGH_LIBRARY_HOURS_CODE,
        },
      },
    }
    return {
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
    }
  }
  return mapStateToProps
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class HomePageHoursContainer extends Component {
  componentDidMount () {
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  render () {
    return (
      <InlineContainer
        status={this.props.hoursEntry.status}
        hoursEntry={this.props.hoursEntry}
        presenter={HoursHomePagePresenter} />)
  }
}

HomePageHoursContainer.propTypes = {
  hoursEntry: PropTypes.shape({
    status: PropTypes.string,
  }).isRequired,
  fetchHours: PropTypes.func.isRequired,
}

const HomePageHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(HomePageHoursContainer)

export default withErrorBoundary(HomePageHours)
