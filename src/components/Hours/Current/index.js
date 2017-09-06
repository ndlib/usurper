import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../actions/hours'
import CurrentHoursCollapsedPresenter from './collapsed_presenter.js'
import CurrentHoursExpandedPresenter from './expanded_presenter.js'
import makeGetHoursForServicePoint from '../../../selectors/hours'
import * as statuses from '../../../constants/APIStatuses'
import InlineContainer from '../InlineContainer'

// Parses date/time from the strings given in an hoursEntry. midnightDayOffset specifies an adjustment
// to the day when the time given is "00:MM". This should generally only be set to +1 for close dates
const timeToday = (dateString, timeString, utcOffset, midnightDayOffset) => {
  // This does not account for time zone differences
  // We have to split the strings instead of concating as [date]T[time] because different browsers
  //   parse the timezone differently if it's not defined (UTC vs local)
  //   while all handle constructors the same (always local)
  console.log("1")
  const dateArray = dateString.split('-')
  console.log(timeString)
  const timeArray = timeString.split(':')
  console.log("3")
  const offsetArray = utcOffset.split(':')
  console.log("4")
  const offsetHrs = parseInt(offsetArray[0])
  console.log("5")
  const offsetMins = (offsetHrs * 60) + parseInt(offsetArray[1])
  console.log("6")

  const hour = Number(timeArray[0])
  const minute = Number(timeArray[1])
  const year = Number(dateArray[0])
  const month = Number(dateArray[1]) - 1 // Month is month - 1 because date month is 0 based
  const day = Number(dateArray[2]) + (hour === 0 ? midnightDayOffset : 0)
  console.log(year, month, day, hour, minute)
  let time = new Date(year, month, day, hour, minute)

  // The difference in offsets between local time and the api's time, in minutes
  let offsetDeltaMins = -offsetMins - time.getTimezoneOffset()
  return new Date(time.getTime() + (offsetDeltaMins * 60000))
}

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
    }
    return ret
  }
  return mapStateToProps
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class CurrentHoursContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expanded: false,
      isOpen: this.checkOpen(props),
    }
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  componentDidMount () {
    // check current time every second to update color
    const intervalId = setInterval(this.tick.bind(this), 1000)
    this.setState({ intervalId: intervalId })
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }
  componentWillUnmount () {
    clearInterval(this.state.intervalId)
  }
  componentWillReceiveProps (newProps) {
    this.setState({ isOpen: this.checkOpen(newProps) })
  }

  toggleExpanded (e) {
    if (e.type === 'click' || (e.type === 'keydown' && e.keyCode === 13)) {
      this.setState({ expanded: !this.state.expanded })
    }
  }

  checkOpen (props) {
    try {
      const entry = props.hoursEntry
      const testDate = entry.today.date
      const currentOpenBlocks = entry.today.times.hours.filter(hoursBlock => {
        console.log(hoursBlock)
        if (hoursBlock.from === hoursBlock.to) {
          return false
        }
        console.log("here")
        let opens = timeToday(testDate, hoursBlock.from, "-04:00", 0)
        let closes = timeToday(testDate, hoursBlock.to, "-04:00", 1)
        console.log(opens)
        let now = new Date()
        if (opens <= now && now <= closes) {
          return true
        }
      })
      return (currentOpenBlocks.length > 0)
    } catch (e) {
      return false
    }
  }

  tick () {
    this.setState({ isOpen: this.checkOpen(this.props) })
  }

  render () {
    let presenter = CurrentHoursCollapsedPresenter
    if (this.state.expanded) {
      presenter = CurrentHoursExpandedPresenter
    }

    return (
      <InlineContainer
        status={this.props.hoursEntry.status}
        hoursEntry={this.props.hoursEntry}
        isOpen={this.state.isOpen}
        presenter={presenter}
        toggleExpanded={this.toggleExpanded}
      >{this.props.children}</InlineContainer>)
  }
}

CurrentHoursContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  jsonHoursApiKey: PropTypes.string,
  servicePoint: PropTypes.object,
  fetchHours: PropTypes.func.isRequired,
}

const CurrentHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CurrentHoursContainer)

export default CurrentHours
