import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

export class DateFilter extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: [],
    }

    this.onYearClick = this.onYearClick.bind(this)
  }

  onYearClick (event) {
    // save the state of this year, if it's expanded or not
    const year = event.target.text
    let expanded = this.state.expanded

    // toggle on/off
    if (this.state.expanded.includes(year)) {
      expanded = expanded.filter(i => i !== year)
    } else {
      expanded.push(year)
    }

    this.setState({
      expanded: expanded,
    })
  }

  render () {
    // Count number of events present in each month.
    // If an event starts in one month and ends in another, it counts for both months
    const eventDates = {}

    // add to the count of events in this month
    //  if this month doesn't have anything yet, intialize with display and url data
    const addDate = (year, month) => {
      if (!eventDates[year]) {
        eventDates[year] = {}
      }
      if (!eventDates[year][month]) {
        const date = moment()
        date.month(month)
        date.year(year)

        eventDates[year][month] = {
          url: '/events/past/' + date.format('YYYYMM'),
          display: date.format('MMM'),
          count: 0,
        }
      }

      eventDates[year][month].count += 1
    }

    this.props.events.forEach((event) => {
      let date = new Date(event.startDate)
      const end = new Date(event.endDate)

      while (date <= end) {
        addDate(date.getFullYear(), date.getMonth())
        // set to first day of the following month
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      }
    })

    if (typy(eventDates, `[${this.props.filterYear}][${this.props.filterMonth}]`).isObject) {
      eventDates[this.props.filterYear][this.props.filterMonth].url = null
    }

    return (
      <Presenter eventDates={eventDates} yearCallback={this.onYearClick} expanded={this.state.expanded} />
    )
  }
}

DateFilter.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
  })).isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
}

export default DateFilter
