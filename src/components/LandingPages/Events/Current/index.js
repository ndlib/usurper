import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllEvents } from 'actions/contentful/allEvents'
import { fetchAllEventGroups } from 'actions/contentful/allEventGroups'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class CurrentEventsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allEventGroups.status === statuses.NOT_FETCHED) {
      this.props.fetchAllEventGroups(preview)
    } else if (this.props.allEventGroups.status === statuses.SUCCESS && this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview, this.props.allEventGroups.json)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allEvents, allEventGroups } = state
  const combinedStatus = helper.reduceStatuses([
    allEvents.status,
    allEventGroups.status,
  ])

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
    allEventGroups,
    combinedStatus,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents, fetchAllEventGroups }, dispatch)
}

CurrentEventsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  hasFilter: PropTypes.bool,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array.isRequired,
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  fetchAllEventGroups: PropTypes.func.isRequired,
  allEventGroups: PropTypes.shape({
    status: PropTypes.string.isRequired,
    json: PropTypes.array,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

const CurrentEvents = connect(mapStateToProps, mapDispatchToProps)(CurrentEventsContainer)

export default CurrentEvents
