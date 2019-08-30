import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import CurrentEvents from './Current'
import PastEvents from './Past'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import { fetchAllEvents } from 'actions/contentful/allEvents'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import * as dateLibs from 'shared/DateLibs'

export class EventsPageContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      events: props.events,
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      filterValue: '',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  static getDerivedStateFromProps (props, state) {
    // if we clicked on a date filter, make sure the page update removes any search filter
    if (props.pageDate !== state.pageDate) {
      return {
        pageDate: props.pageDate,
        filterValue: '',
      }
    }
    return null
  }

  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview)
    }
  }

  componentDidUpdate (prevProps) {
    if ((this.props.allEventsStatus === statuses.SUCCESS && prevProps.allEventsStatus !== statuses.SUCCESS) ||
      this.props.isPast !== prevProps.isPast || this.props.pageDate !== prevProps.pageDate) {
      // Trigger filter event so the state gets updated to match props
      this.onFilterChange()
    }
  }

  onFilterChange (e) {
    const value = typy(e, 'target.value').safeString

    if (!value) {
      this.setState({
        events: this.props.events,
        filterValue: '',
        pageTitle: this.props.pageTitle,
      })
      return
    }

    const searchFields = ['title', 'content', 'presenter', 'shortDescription']
    // filter to events that have the search value in any of the specified fields
    const events = helper.filterList(this.props.allEvents, searchFields, value).slice(0, 50)

    this.setState({
      events: events,
      filterValue: value,
      pageTitle: 'Search for "' + value + '"',
    })
  }

  render () {
    return (
      <PresenterFactory
        presenter={this.props.isPast ? PastEvents : CurrentEvents}
        props={{
          ...this.props,
          events: this.state.events,
          onFilterChange: this.onFilterChange,
          filterValue: this.state.filterValue,
          pageTitle: this.state.pageTitle,
        }}
        status={this.props.allEventsStatus}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let events = []
  let relevantEvents = []
  if (state.allEvents.status === statuses.SUCCESS) {
    const now = new Date()
    const sortedAllEvents = helper.sortList(state.allEvents.json, 'startDate', 'asc')

    events = sortedAllEvents.filter((entry) => {
      if (entry && entry.startDate && entry.endDate) {
        return ownProps.isPast
          ? (entry.startDate < now && entry.endDate < now)
          : (entry.startDate >= now || entry.endDate >= now)
      }
      return false
    })
    relevantEvents = JSON.parse(JSON.stringify(events))
  }

  // check if we're filtered to a month
  const dateString = ownProps.match.params.date

  let pageTitle = ownProps.isPast ? 'Past Events' : 'Current Events'
  let filterMonth = null
  let filterYear = null
  let filterDay = null
  // if filtered to a month, get the numeric values of month and year
  if (dateString && dateString.match(/^\d{6}/) !== null) {
    const hasDay = dateString.match(/^\d{8}$/) !== null
    // Only apply date filters if day is specified or if it's the past events page (and therefore only need year and month)
    if (ownProps.isPast || hasDay) {
      const date = moment(dateString, hasDay ? 'YYYYMMDD' : 'YYYYMM')
      pageTitle = hasDay ? `Events on ${date.format('MMM Do YYYY')}` : `Past Events - ${date.format('MMMM YYYY')}`

      filterMonth = date.month()
      filterYear = date.year()
      filterDay = hasDay ? date.day() : null
    }
  }

  // filter events to either be the specified month or the past 30 days
  if (filterYear !== null && filterMonth !== null) {
    if (filterDay) {
      const selectedDate = moment(dateString, 'YYYYMMDD').format('YYYYMMDD')
      events = events.filter((entry) => {
        const start = moment(entry.startDate).format('YYYYMMDD')
        const end = moment(entry.endDate).format('YYYYMMDD')
        return start === selectedDate || end === selectedDate || (start < selectedDate && end >= selectedDate)
      })
    } else {
      events = events.filter(event => dateLibs.isInMonth(event.startDate, event.endDate, filterYear, filterMonth))
    }
  } else {
    const daysAgo30 = new Date()
    // subtract 30 days from now
    daysAgo30.setTime(daysAgo30.getTime() - (30 * 24 * 60 * 60 * 1000))

    events = events.filter(event => {
      return event.endDate >= daysAgo30
    })
  }

  return {
    allEvents: relevantEvents,
    allEventsStatus: state.allEvents.status,
    events,
    pageTitle,
    pageDate: dateString,
    filterYear,
    filterMonth,
    filterDay,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents }, dispatch)
}

EventsPageContainer.propTypes = {
  allEvents: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  isPast: PropTypes.bool,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const EventsPage = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(EventsPageContainer))

export default EventsPage
