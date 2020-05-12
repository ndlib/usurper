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
import * as dateLibs from 'shared/DateLibs'

export class PastEventsContainer extends Component {
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

  // Check for month filter
  const dateString = ownProps.match.params.date || ''
  const hasFilter = !!(dateString.match(/^\d{6}$/))

  let pageTitle = 'Past Events'
  let pageDate
  let filterYear
  let filterMonth

  if (hasFilter) {
    pageTitle = `${pageTitle} - ${moment(dateString, 'YYYYMM').format('MMMM YYYY')}`
    pageDate = dateString
    filterYear = moment(dateString, 'YYYYMM').year()
    filterMonth = moment(dateString, 'YYYYMM').month()
  }

  const now = new Date()
  const events = typy(state, 'allEvents.json').safeArray.filter(entry => {
    if (entry && entry.startDate && entry.endDate) {
      return entry.startDate < now && entry.endDate < now
    }
    return false
  })
  const filteredEvents = events.filter(entry => {
    return hasFilter
      ? dateLibs.isInMonth(entry.startDate, entry.endDate, filterYear, filterMonth)
      : entry.endDate >= moment().subtract(30, 'days')
  })

  return {
    pageTitle,
    pageDate,
    events,
    filteredEvents,
    filterYear,
    filterMonth,
    allEventsStatus: allEvents.status,
    allEventGroups,
    combinedStatus,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents, fetchAllEventGroups }, dispatch)
}

PastEventsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  filteredEvents: PropTypes.array.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
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
  }),
}

const PastEvents = connect(mapStateToProps, mapDispatchToProps)(PastEventsContainer)

export default PastEvents
