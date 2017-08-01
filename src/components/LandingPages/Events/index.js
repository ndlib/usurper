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

const mapStateToProps = (state) => {
  let allEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    let now = new Date()

    allEvents = state.allEvents.json
      .map((entry) => {
        // flatten locales to just 'en-us' and convert strings to datetime type
        flattenLocale(entry.fields, 'en-US')
        return {
          ...entry.fields,
          startDate: new Date(entry.fields.startDate),
          endDate: entry.fields.endDate ? new Date(entry.fields.endDate) : new Date(entry.fields.startDate),
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
      .sort((left, right) => {
        // sort so events starting soonest are at the top
        let a = left.startDate
        let b = right.startDate

        if (a < b) {
          return 1
        } else if (b < a) {
          return -1
        }
        return 0
      })
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
