import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllEvents } from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'

export class CurrentEventsContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allEvents } = state
  // Check for date filter
  const dateString = ownProps.match.params.date || ''
  const hasFilter = !!(dateString.match(/^\d{8}$/))

  let pageTitle = 'Current Events'
  let pageDate

  if (hasFilter) {
    pageTitle = `Events on ${moment(dateString, 'YYYYMMDD').format('MMM Do YYYY')}`
    pageDate = dateString
  }

  const now = new Date()
  const events = typy(state, 'allEvents.json').safeArray.filter(entry => {
    if (entry && entry.startDate && entry.endDate) {
      return entry.startDate >= now || entry.endDate >= now
    }
    return false
  })
  const filteredEvents = hasFilter ? events.filter(entry => {
    const start = moment(entry.startDate).format('YYYYMMDD')
    const end = moment(entry.endDate).format('YYYYMMDD')
    return start === dateString || end === dateString || (start < dateString && end >= dateString)
  }) : events

  return {
    pageTitle,
    pageDate,
    hasFilter,
    events,
    filteredEvents,
    allEventsStatus: allEvents.status,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents }, dispatch)
}

CurrentEventsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  hasFilter: PropTypes.bool,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

const CurrentEvents = connect(mapStateToProps, mapDispatchToProps)(CurrentEventsContainer)

export default CurrentEvents
