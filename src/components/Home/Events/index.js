import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from '../../../actions/contentful/allEvents'
import Presenter from './presenter.js'
import PresenterFactory from '../../APIInlinePresenterFactory'
import * as statuses from '../../../constants/APIStatuses'
import { flattenLocale } from '../../../shared/ContentfulLibs'

const collapseDate = (start, end, diffVal, eqVal) => {
  // formats dates to displayble text
  // eg. collpaseDate(Monday, Monday) => "Monday"
  // eg. collapseDate(Jan, Feb) => "Jan-Feb"
  if (start === end) {
    if (eqVal !== undefined) {
      return eqVal
    }
    return start
  }
  if (diffVal !== undefined) {
    return diffVal
  }
  return start + '-' + end
}

export const mapEvents = (json) => {
  return json.map((entry) => {
    // flatten locales to just 'en-us' and convert strings to datetime type
    flattenLocale(entry.fields, 'en-US')

    let end = entry.fields.endDate ? new Date(entry.fields.endDate) : new Date(entry.fields.startDate)
    // if end time is 0:00, add a day
    if (end.getHours() === 0 && end.getMinutes() === 0) {
      end.setDate(end.getDate() + 1)
    }

    return {
      ...entry.fields,
      startDate: new Date(entry.fields.startDate),
      endDate: end,
    }
  })
  .map((entry) => {
    // Map datetime to displayable text
    let start = entry.startDate
    let end = entry.endDate

    return {
      displayWeekday: collapseDate(
        start.getDate(),
        end.getDate(),
        null,
        start.toLocaleString('en-us', { weekday: 'long' })
      ),
      displayDay: collapseDate(start.getDate(), end.getDate()),
      displayMonth: collapseDate(
        start.toLocaleString('en-us', { month: 'short' }),
        end.toLocaleString('en-us', { month: 'short' }),
        undefined,
        start.toLocaleString('en-us', { month: 'long' })
      ),
      displayYear: collapseDate(start.getFullYear(), end.getFullYear()),
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
      .slice(0, 3)
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
