import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class EventsWrapperContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      events: helper.sortList(props.filteredEvents, 'startDate', 'asc'),
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      filterValue: '',
    }

    this.onFilterChange = this.onFilterChange.bind(this)
  }

  static getDerivedStateFromProps (props, state) {
    // if we clicked on a date filter, make sure the page update removes any search filter
    if (props.pageDate !== state.pageDate) {
      return {
        pageDate: props.pageDate,
        filterValue: '',
      }
    }
    return null
  }

  componentDidUpdate (prevProps) {
    if ((this.props.allEventsStatus === statuses.SUCCESS && prevProps.allEventsStatus !== statuses.SUCCESS) ||
      this.props.pageDate !== prevProps.pageDate) {
      // Trigger filter event so the state gets updated to match props
      this.onFilterChange()
    }
  }

  onFilterChange (e) {
    const value = typy(e, 'target.value').safeString

    if (!value) {
      this.setState({
        events: helper.sortList(this.props.filteredEvents, 'startDate', 'asc'),
        filterValue: '',
        pageTitle: this.props.pageTitle,
      })
      return
    }

    const searchFields = ['title', 'content', 'presenter', 'shortDescription']
    // filter to events that have the search value in any of the specified fields
    const events = helper.filterAndSort(this.props.events, searchFields, value, 'startDate', 'asc').slice(0, 50)

    this.setState({
      events: events,
      filterValue: value,
      pageTitle: 'Search for "' + value + '"',
    })
  }

  render () {
    return (
      <PresenterFactory
        presenter={Presenter}
        props={{
          ...this.props,
          events: this.state.events,
          onFilterChange: this.onFilterChange,
          filterValue: this.state.filterValue,
          pageTitle: this.state.pageTitle,
        }}
        status={this.props.allEventsStatus}
      />
    )
  }
}

export const mapStateToProps = (state) => {
  const { allEvents } = state

  return {
    allEventsStatus: allEvents.status,
  }
}

EventsWrapperContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array,
  pageDate: PropTypes.string,
  allEventsStatus: PropTypes.string.isRequired,
}

const EventsWrapper = connect(mapStateToProps)(EventsWrapperContainer)

export default EventsWrapper
