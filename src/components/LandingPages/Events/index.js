import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from '../../../actions/contentful/allEvents'
import PresenterFactory from '../../APIInlinePresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { mapEvents, sortEvents } from '../../Home/Events'
import Presenter from './presenter'
import { withErrorBoundary } from '../../ErrorBoundary'

const mapStateToProps = (state) => {
  let allEvents = []
  let pastEvents = []
  let currentFutureEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    const now = new Date()
    allEvents = mapEvents(state.allEvents.json).sort(sortEvents)
    currentFutureEvents = allEvents.filter((entry) => {
      if (entry && entry.startDate && entry.endDate) {
        return entry.startDate >= now || entry.endDate >= now
      }
      return false
    })

    pastEvents = allEvents.filter((entry) => {
      if (entry && entry.startDate && entry.endDate) {
        return entry.startDate < now && entry.endDate < now
      }
      return false
    })
  }

  return {
    allEvents,
    pastEvents,
    currentFutureEvents,
    allEventsStatus: state.allEvents.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents }, dispatch)
}

export class AllEventsContainer extends Component {
  componentDidMount () {
    if (this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents('publish')
    }
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={{
          all: this.props.allEvents,
          past: this.props.pastEvents,
          present: this.props.currentFutureEvents,
          ...this.props,
        }}
        status={this.props.allEventsStatus} />
    )
  }
}

AllEventsContainer.propTypes = {
  allEvents: PropTypes.array.isRequired,
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  pastEvents: PropTypes.array.isRequired,
  currentFutureEvents: PropTypes.array.isRequired,
}

const EventsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default withErrorBoundary(EventsPage)
