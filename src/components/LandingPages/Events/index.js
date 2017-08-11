import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from '../../../actions/contentful/allEvents'
import Presenter from './presenter.js'
import PresenterFactory from '../../APIInlinePresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { mapEvents, sortEvents } from '../../Home/Events'

const mapStateToProps = (state) => {
  let pastEvents = []
  let currentFutureEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    let now = new Date()

    let allEvents = mapEvents(state.allEvents.json).sort(sortEvents)
    currentFutureEvents = allEvents.filter((entry) => {
      return entry.startDate >= now || entry.endDate >= now
    })

    pastEvents = allEvents.filter((entry) => {
      return entry.startDate < now && entry.endDate < now
    })
  }

  return {
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
        props={{ past: this.props.pastEvents, present: this.props.currentFutureEvents }}
        status={this.props.allEventsStatus} />
    )
  }
}

AllEventsContainer.propTypes = {
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  pastEvents: PropTypes.array.isRequired,
  currentFutureEvents: PropTypes.array.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default HoursPage
