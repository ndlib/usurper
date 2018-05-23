import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Presenter from './presenter'

export class DateFilterContainer extends Component {
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
    return (
      <Presenter
        eventDates={this.props.eventDates}
        yearCallback={this.onYearClick}
        expanded={this.state.expanded}
      />
    )
  }
}

DateFilterContainer.propTypes = {
  eventDates: PropTypes.object.isRequired,
}

export default DateFilterContainer
