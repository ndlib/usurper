import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from '../../../actions/contentful/allEvents'
import Presenter from './presenter.js'
import PresenterFactory from '../../APIInlinePresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { flattenLocale } from '../../../shared/ContentfulLibs'

const makeLocalTimezone = (stringDate) => {
  // local timezone offset string (eg -04:00)
  const givenTz = stringDate.slice(-6)

  // local timezone offset in minutes (eg 240)
  const localOffset = new Date().getTimezoneOffset()
  const localNeg = localOffset > 0 ? '-' : '+'
  // 240 / 60 = 4
  const hour = '' + Math.floor(Math.abs(localOffset / 60))
  // if we're in a zone with minute offsets
  const minute = '' + Math.abs(localOffset % 60)
  // combine above strings into the same fomrat as "givenTz"
  let stringLocalTz = `${localNeg}${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`

  // use our local timezone string for this information instead of the given one
  stringDate = stringDate.replace(givenTz, stringLocalTz)

  let ret = new Date(stringDate)
  let retOffset = ret.getTimezoneOffset()
  // if the changed date is in a different timezone than us (daylight savings) offset it back
  if (retOffset !== localOffset) {
    // in minutes
    let offset = localOffset - retOffset
    // to milliseconds
    offset = offset * 60 * 1000

    ret = new Date(ret.getTime() - offset)
  }

  return ret
}

const isSameDay = (start, end) => {
  return start.getMonth() === end.getMonth() &&
         start.getDay() === end.getDay() &&
         start.getYear() === end.getYear()
}

const startEndDate = (start, end) => {
  let startYear = ', ' + start.getFullYear()
  let endYear = ', ' + end.getFullYear()
  let options = { weekday: 'long', month: 'long', day: 'numeric' }

  let out = start.toLocaleString('en-US', options)
  if (isSameDay(start, end)) {
    // only show one day with the year
    return out + startYear
  }
  if (start.getFullYear() === end.getFullYear()) {
    // only show the year at the end if the start and end are in the same yar
    startYear = ''
  }
  out += startYear + ' - ' + end.toLocaleString('en-US', options) + endYear
  return out
}

const hour12 = (date) => {
  let ampm = 'am'
  let hour = date.getHours()
  let minute = '' + date.getMinutes()

  minute = minute.padStart(2, '0')

  if (hour === 0) {
    hour = 12
  } else if (hour >= 12) {
    ampm = 'pm'
    if (hour > 12) {
      hour = hour % 12
    }
  }

  // 8:00am
  return `${hour}:${minute}${ampm}`
}

const startEndTime = (start, end) => {
  // Only show time if the event is only 1 day
  if (isSameDay(start, end)) {
    let out = hour12(start)
    if (start.getTime() !== end.getTime()) {
      out += ' - ' + hour12(end)
    }
    return out
  }
  return null
}

export const mapEvents = (json) => {
  return json.map((entry) => {
    // flatten locales to just 'en-us' and convert strings to datetime type
    flattenLocale(entry.fields, 'en-US')

    let start = makeLocalTimezone(entry.fields.startDate)
    let end = entry.fields.endDate ? makeLocalTimezone(entry.fields.endDate) : makeLocalTimezone(entry.fields.startDate)
    // if end time is 0:00, add 23:59
    if (end.getHours() === 0 && end.getMinutes() === 0) {
      end.setTime(end.getTime() + (23 * 60 * 60 * 1000) + (59 * 60 * 1000))
    }

    return {
      ...entry.fields,
      startDate: start,
      endDate: end,
    }
  })
  .map((entry) => {
    // Map datetime to displayable text
    let start = entry.startDate
    let end = entry.endDate

    return {
      displayDate: startEndDate(start, end),
      displayTime: startEndTime(start, end),
      ...entry,
    }
  })
}

// We need to sort twice, first to get preferred items at the top,
//   then slice to the number we want, then sort to make sure dates are in order
export const sortEvents = (left, right, withPreferred = false) => {
  // sort so events starting soonest are at the top
  let a = left.startDate
  let b = right.startDate

  if (withPreferred) {
    let aPreferred = left.preferOnHomepage
    let bPreferred = right.preferOnHomepage

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
    let now = new Date()

    allEvents = mapEvents(state.allEvents.json)
      .filter((entry) => {
        // Only use entries which are in the future or ongoing
        return entry.startDate >= now || entry.endDate >= now
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

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default HoursPage
