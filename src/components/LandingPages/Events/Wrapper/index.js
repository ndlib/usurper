import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'
import PresenterFactory from 'components/APIInlinePresenterFactory'

import Config from 'shared/Configuration'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class EventsWrapperContainer extends Component {
  constructor (props) {
    super(props)

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onFacetApply = this.onFacetApply.bind(this)
    this.onFacetRemove = this.onFacetRemove.bind(this)
    this.filter = this.filter.bind(this)

    this.state = {
      events: this.filter(),
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      filterValue: '',
    }
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

  filter (searchFilter, audienceFilter, typeFilter) {
    // If there is a search value, search all events regardless of selected date or month
    let events = searchFilter ? this.props.events : this.props.filteredEvents
    if (Config.features.eventsFilteringEnabled) {
      // Filter by facets
      audienceFilter = audienceFilter || this.props.audienceFilter
      if (audienceFilter.length) {
        events = events.filter(event => {
          return audienceFilter.some(currentAudience => typy(event.audience).safeArray.includes(currentAudience))
        })
      }
      typeFilter = typeFilter || this.props.typeFilter
      if (typeFilter.length) {
        events = events.filter(event => typeFilter.includes(event.type))
      }
    }
    // If searching, filter by search value and limit to 50 results
    if (searchFilter) {
      const searchFields = ['title', 'content', 'shortDescription', 'audience[*]', 'type[*]', 'presenters[*].fields.people[*].fields.name']
      events = helper.filterList(events, searchFields, searchFilter, false).slice(0, 50)
    }
    return helper.sortList(events, 'startDate', 'asc')
  }

  onFilterChange (e, audienceFilter, typeFilter) {
    const searchValue = typy(e, 'target.value').safeString

    this.setState({
      events: this.filter(searchValue, audienceFilter, typeFilter),
      filterValue: searchValue,
      pageTitle: searchValue ? `Search for "${searchValue}"` : this.props.pageTitle,
    })
  }

  onFacetApply (facetName, selection) {
    const queryString = helper.buildQueryString(this.props.location.search, facetName, selection)
    this.props.history.push(this.props.location.pathname + queryString)
    // Trigger an update to the filter the same as if the search bar changed
    const audienceFilter = facetName === 'audience' ? selection : this.props.audienceFilter
    const typeFilter = facetName === 'type' ? selection : this.props.typeFilter
    this.setState({
      events: this.filter(this.state.filterValue, audienceFilter, typeFilter),
    })
  }

  onFacetRemove (facetName, valueToRemove) {
    if (facetName === 'audience') {
      const newFilter = this.props.audienceFilter.filter(value => value !== valueToRemove)
      this.onFacetApply('audience', newFilter)
    } else if (facetName === 'type') {
      const newFilter = this.props.typeFilter.filter(value => value !== valueToRemove)
      this.onFacetApply('type', newFilter)
    }
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
          onFacetApply: this.onFacetApply,
          onFacetRemove: this.onFacetRemove,
        }}
        status={this.props.allEventsStatus}
      />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allEvents } = state

  // Get facets from query string
  const audienceFilter = []
  const typeFilter = []
  const queryParams = ownProps.location.search.replace('?', '').split('&')
  queryParams.forEach(param => {
    const split = decodeURIComponent(param).split('=')
    if (split[0].toLowerCase() === 'audience') {
      audienceFilter.push(split[1])
    } else if (split[0].toLowerCase() === 'type') {
      typeFilter.push(split[1])
    }
  })

  return {
    allEventsStatus: allEvents.status,
    audienceFilter,
    typeFilter,
  }
}

EventsWrapperContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  filteredEvents: PropTypes.array,
  pageDate: PropTypes.string,
  allEventsStatus: PropTypes.string.isRequired,
  audienceFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  typeFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    pathname: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const EventsWrapper = connect(mapStateToProps)(EventsWrapperContainer)

export default EventsWrapper
