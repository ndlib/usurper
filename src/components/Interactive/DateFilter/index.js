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

  onYearClick (entry) {
    // save the state of this year, if it's expanded or not
    const year = entry.target.text
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
    const entryDates = {}

    // add to the count of events in this month
    //  if this month doesn't have anything yet, intialize with display and url data
    const addDate = (year, month) => {
      if (!entryDates[year]) {
        entryDates[year] = {}
      }
      if (!entryDates[year][month]) {
        const date = moment()
        date.month(month)
        date.year(year)

        // Get the current path minus the date and anything after it (Ex: /events/past/201901 -> /events/past/)
        let pathPrefix = this.props.location.pathname.match(/.+?(?=\d{6}|$)/)[0]
        if (!pathPrefix.endsWith('/')) {
          pathPrefix += '/'
        }
        entryDates[year][month] = {
          url: pathPrefix + date.format('YYYYMM') + this.props.location.search,
          display: date.format('MMM'),
          count: 0,
        }
      }

      entryDates[year][month].count += 1
    }

    this.props.entries.forEach((entry) => {
      if (!entry) {
        return
      }

      let date = new Date(entry.startDate)
      const end = new Date(entry.endDate)

      while (date <= end) {
        addDate(date.getFullYear(), date.getMonth())
        // set to first day of the following month
        date = new Date(date.getFullYear(), date.getMonth() + 1, 1)
      }
    })

    if (typy(entryDates, `[${this.props.filterYear}][${this.props.filterMonth}]`).isObject) {
      entryDates[this.props.filterYear][this.props.filterMonth].url = null
    }

    return (
      <Presenter entryDates={entryDates} yearCallback={this.onYearClick} expanded={this.state.expanded} />
    )
  }
}

DateFilter.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    startDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]).isRequired,
    endDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]).isRequired,
  })).isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

export default DateFilter
