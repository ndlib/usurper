import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Presenter from './presenter'

import moment from 'moment'
import { withRouter } from 'react-router'

// add to the count of events in this month
//  if this month doesn't have anything yet, intialize with display and url data
const addDate = (dict, year, month) => {
  if (!dict[year]) {
    dict[year] = {}
  }
  if (!dict[year][month]) {
    let date = moment()
    date.month(month)
    date.year(year)

    dict[year][month] = {
      url: '/events/past/' + date.format('YYYYMM'),
      display: date.format('MMM'),
      count: 0,
    }
  }

  dict[year][month].count += 1
}

// filter events to those that are in the given month
const monthFilter = (events, year, month) => {
  return events.filter(event => {
    const startYear = event.startDate.getFullYear()
    const inStart = (startYear === year && event.startDate.getMonth() <= month) || startYear < year

    const endYear = event.endDate.getFullYear()
    const inEnd = (endYear === year && event.endDate.getMonth() >= month) || endYear > year
    return inStart && inEnd
  })
}

const mapStateToProps = (state, ownProps) => {
  let eventDates = {}
  // count number of events present in each month
  //  if an event starts in jan and ends in feb, it counts for both months
  ownProps.events.forEach((event) => {
    let date = new Date(event.startDate)
    while (date < event.endDate) {
      addDate(eventDates, date.getFullYear(), date.getMonth())
      date.setMonth(date.getMonth() + 1, 1) // increment the month by 1
    }
  })

  // check if we're filtered to a month
  const dateRegEx = /\d{6}/
  let dateString = ownProps.match.params.date

  let pageTitle = 'Past Events'
  let filterMonth = null
  let filterYear = null
  if (dateString && dateString.length === 6 && dateString.match(dateRegEx) !== null) {
    const date = moment(dateString, 'YYYYMM')
    pageTitle = date.format('MMMM YYYY')

    filterMonth = date.month()
    filterYear = date.year()
  }

  // filter events to either be the specified month or the past 30 days
  let events = []
  if (filterYear !== null && filterMonth !== null) {
    events = monthFilter(ownProps.events, filterYear, filterMonth)
    eventDates[filterYear][filterMonth].url = null
  } else {
    let daysAgo30 = new Date()
    // subtract 30 days from now
    daysAgo30.setTime(daysAgo30.getTime() - (30 * 24 * 60 * 60 * 1000))

    events = ownProps.events.filter(event => {
      return event.endDate >= daysAgo30
    })
  }

  return {
    events: events,
    eventDates: eventDates,
    pageTitle: pageTitle,
  }
}

export class PastEventsContainer extends Component {
  render () {
    return (
      <Presenter
        pageTitle={this.props.pageTitle}
        events={this.props.events}
        eventDates={this.props.eventDates}
      />
    )
  }
}

PastEventsContainer.propTypes = {
  events: PropTypes.array.isRequired,
  eventDates: PropTypes.object.isRequired,
  pageTitle: PropTypes.string.isRequired,
}

const PastEvents = withRouter(connect(
  mapStateToProps
)(PastEventsContainer))

export default PastEvents
