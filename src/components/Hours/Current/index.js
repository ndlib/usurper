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

// Parses date/time from the strings given in an hoursEntry.
const timeToday = (dateString, timeString) => {
  // The api doesn't give the zone designator, so making an assumption here
  let utcMs = Date.parse(dateString + 'T' + timeString + '-04:00')
  let date = new Date(utcMs)
  return date
}

// We  need a way to give each instance of a container access to its own private selector.
// this is done by creating a private instance of the conector for each component.
const makeMapStateToProps = () => {
  const getHoursForServicePoint = makeGetHoursForServicePoint()
  const mapStateToProps = (state, props) => {
    // these props are required for the inline container.
    let ret = {
      jsonHoursApiKey: props.jsonHoursApiKey, // the key to look up hours component in the store used in the selector.
      hoursEntry: getHoursForServicePoint(state, props), // the actual hours used in the selector.
      isOpen: true,
    }

    if (ret.hoursEntry && ret.hoursEntry.today) {
      const opens = timeToday(ret.hoursEntry.today.date, ret.hoursEntry.today.opens)
      const closes = timeToday(ret.hoursEntry.today.date, ret.hoursEntry.today.closes)
      const now = new Date()
      ret.isOpen = (opens <= now && now <= closes)
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
    this.state = { expanded: false }
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  componentDidMount () {
    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  toggleExpanded () {
    this.setState({ expanded: !this.state.expanded })
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
        isOpen={this.props.isOpen}
        presenter={presenter}
        toggleExpanded={this.toggleExpanded}
      >{this.props.children}</InlineContainer>)
  }
}

CurrentHoursContainer.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
  jsonHoursApiKey: PropTypes.string.isRequired,
  fetchHours: PropTypes.func.isRequired,
}

const CurrentHours = connect(
  makeMapStateToProps,
  mapDispatchToProps
)(CurrentHoursContainer)

export default CurrentHours
