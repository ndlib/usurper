import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllEvents } from 'actions/contentful/allEvents'
import { fetchAllEventGroups } from 'actions/contentful/allEventGroups'
import { fetchGrouping } from 'actions/contentful/grouping'
import { mapFacet } from 'constants/facets'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import * as dateLibs from 'shared/DateLibs'

const FACETS_GROUPING = 'event-facets'

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
    if (this.props.facetStatus === statuses.NOT_FETCHED) {
      this.props.fetchGrouping(FACETS_GROUPING, preview, 2)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allEvents, allEventGroups, grouping } = state

  const facetStatus = typy(grouping, `${FACETS_GROUPING}.status`).safeString || statuses.NOT_FETCHED
  const combinedStatus = helper.reduceStatuses([
    allEvents.status,
    allEventGroups.status,
    facetStatus,
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

  const facets = (facetStatus === statuses.SUCCESS)
    ? typy(grouping, `${FACETS_GROUPING}.data.fields.items`).safeArray.map(mapFacet)
    : []

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
    facetStatus,
    facets,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents, fetchAllEventGroups, fetchGrouping }, dispatch)
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
  fetchGrouping: PropTypes.func.isRequired,
  facetStatus: PropTypes.string.isRequired,
  facets: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const PastEvents = connect(mapStateToProps, mapDispatchToProps)(PastEventsContainer)

export default PastEvents
