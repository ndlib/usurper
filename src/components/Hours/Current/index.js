import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter'
import HoursError from '../Error'
import { withErrorBoundary } from 'components/ErrorBoundary'
import InlineLoading from 'components/Messages/InlineLoading'

import * as statuses from 'constants/APIStatuses'
import { getOpenStatus } from 'constants/hours'
import { fetchHours } from 'actions/hours'
import makeGetHoursForServicePoint from 'selectors/hours'

export class CurrentHoursContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: props.defaultExpanded === true,
      openStatus: getOpenStatus(props.hoursEntry),
    }

    this.toggleExpanded = this.toggleExpanded.bind(this)
    this.tick = this.tick.bind(this)
  }

  componentDidUpdate (prevProps) {
    // When finished load, force a tick so the open status gets updated in the state before render
    if (this.props.hoursEntry.status === statuses.SUCCESS && prevProps.hoursEntry.status !== statuses.SUCCESS) {
      this.tick()
    }
  }

  componentDidMount () {
    // check current time every second to update color
    const intervalId = setInterval(this.tick, 1000)
    this.setState({
      intervalId: intervalId,
      openStatus: getOpenStatus(this.props.hoursEntry),
    })
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }

  toggleExpanded (e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
      this.setState({ expanded: !this.state.expanded })
    }
  }

  tick () {
    this.setState({ openStatus: getOpenStatus(this.props.hoursEntry) })
  }

  render () {
    switch (this.props.hoursEntry.status) {
      case statuses.FETCHING:
        return <InlineLoading />
      case statuses.SUCCESS:
        return (
          <Presenter
            hoursEntry={this.props.hoursEntry}
            openStatus={this.state.openStatus}
            expanded={this.state.expanded}
            toggleExpanded={this.toggleExpanded}
          >
            {this.props.children}
          </Presenter>
        )
      case statuses.ERROR:
        return <HoursError hoursEntry={this.props.hoursEntry} />
      default:
        return null
    }
  }
}

export const mapStateToProps = (state, props) => {
  const selector = makeGetHoursForServicePoint()
  return {
    hoursEntry: selector(state, props),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

CurrentHoursContainer.propTypes = {
  hoursEntry: PropTypes.shape({
    status: PropTypes.string,
    today: PropTypes.shape({
      times: PropTypes.shape({
        status: PropTypes.string,
        hours: PropTypes.arrayOf(PropTypes.shape({
          from: PropTypes.any,
          to: PropTypes.any,
          fromLocalDate: PropTypes.any,
          toLocalDate: PropTypes.any,
        })),
      }),
    }),
  }).isRequired,
  servicePoint: PropTypes.shape({
    fields: PropTypes.shape({
      hoursCode: PropTypes.string,
    }).isRequired,
  }).isRequired,
  defaultExpanded: PropTypes.bool,
  fetchHours: PropTypes.func.isRequired,
  children: PropTypes.any,
}

const CurrentHours = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentHoursContainer)

export default withErrorBoundary(CurrentHours)
