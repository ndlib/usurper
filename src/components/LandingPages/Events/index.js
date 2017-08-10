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
  let allEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    let now = new Date()

    allEvents = mapEvents(state.allEvents.json).sort(sortEvents)
  }
  return {
    allEvents,
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
        props={this.props.allEvents}
        status={this.props.allEventsStatus} />
    )
  }
}

AllEventsContainer.propTypes = {
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  allEvents: PropTypes.array.isRequired,
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default HoursPage
