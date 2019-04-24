import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from 'actions/contentful/allEvents'
import Presenter from './presenter.js'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'
import { flattenLocale } from 'shared/ContentfulLibs'
import * as dateLibs from 'shared/DateLibs'
import { withErrorBoundary } from 'components/ErrorBoundary'

const startEndDate = (start, end) => {
  let startYear = ', ' + start.getFullYear()
  const endYear = ', ' + end.getFullYear()
  const options = { weekday: 'long', month: 'long', day: 'numeric' }

  let out = start.toLocaleString('en-US', options)
  if (dateLibs.isSameDay(start, end)) {
    // only show one day with the year
    return out + startYear
  }
  if (start.getFullYear() === end.getFullYear()) {
    // only show the year at the end if the start and end are in the same yar
    startYear = ''
  }
  out += startYear + ' – ' + end.toLocaleString('en-US', options) + endYear
  return out
}

const startEndTime = (start, end) => {
  // Only show time if the event is only 1 day
  if (dateLibs.isSameDay(start, end)) {
    let out = dateLibs.hour12(start)
    if (start.getTime() !== end.getTime()) {
      out += ' – ' + dateLibs.hour12(end)
    }
    return out
  }
  return null
}

export const mapEvents = (json) => {
  return json.map((entry) => {
    if (entry && entry.fields && entry.fields.startDate && entry.fields.endDate) {
      // flatten locales to just 'en-us' and convert strings to datetime type
      flattenLocale(entry.fields, 'en-US')

      const start = dateLibs.makeLocalTimezone(entry.fields.startDate)
      const end = entry.fields.endDate
        ? dateLibs.makeLocalTimezone(entry.fields.endDate)
        : dateLibs.makeLocalTimezone(entry.fields.startDate)
      // if end time is 0:00, add 23:59
      if (end.getHours() === 0 && end.getMinutes() === 0) {
        end.setTime(end.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000))
      }

      return {
        ...entry.fields,
        startDate: start,
        endDate: end,
      }
    }
    return null
  })
    .map((entry) => {
      if (entry && entry.startDate && entry.endDate) {
        // Map datetime to displayable text
        const start = entry.startDate
        const end = entry.endDate

        return {
          displayDate: startEndDate(start, end),
          displayTime: startEndTime(start, end),
          ...entry,
        }
      }
      return null
    })
}

// We need to sort twice, first to get preferred items at the top,
//   then slice to the number we want, then sort to make sure dates are in order
export const sortEvents = (left, right, withPreferred = false) => {
  // sort so events starting soonest are at the top
  const a = left.startDate
  const b = right.startDate

  if (withPreferred) {
    const aPreferred = left.preferOnHomepage
    const bPreferred = right.preferOnHomepage

    if (aPreferred && !bPreferred) {
      return -1
    } else if (bPreferred && !aPreferred) {
      return 1
    }
  }

  if (a < b) {
    return -1
  } else if (b < a) {
    return 1
  }
  return 0
}

const mapStateToProps = (state) => {
  let allEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    const now = new Date()

    allEvents = mapEvents(state.allEvents.json)
      .filter((entry) => {
        if (entry && entry.startDate && entry.endDate) {
          // Only use entries which are in the future or ongoing
          return entry.startDate >= now || entry.endDate >= now
        }
        return false
      })
      .sort((a, b) => sortEvents(a, b, true))
      .slice(0, 5)
      .sort(sortEvents)
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

const AllEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default withErrorBoundary(AllEvents)
