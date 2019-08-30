import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from 'actions/contentful/allEvents'
import Presenter from './presenter.js'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'
import { withErrorBoundary } from 'components/ErrorBoundary'
import * as helper from 'constants/HelperFunctions'

export class AllEventsContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'

    if (this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview)
    }
  }

  render () {
    return (
      <PresenterFactory presenter={Presenter} props={this.props.allEvents} status={this.props.allEventsStatus} />
    )
  }
}

const mapStateToProps = (state) => {
  let filteredEvents = []
  if (state.allEvents && state.allEvents.status === statuses.SUCCESS) {
    const now = new Date()

    filteredEvents = state.allEvents.json.filter((entry) => {
      if (entry && entry.startDate && entry.endDate) {
        // Only use entries which are in the future or ongoing
        return entry.startDate >= now || entry.endDate >= now
      }
      return false
    })

    // Sort twice. The first time ensures identifies which records and ensures the "preferOnHomepage" are there
    // The second one will correct the order according to date after we have limited the number of records
    filteredEvents = helper.sortList(filteredEvents, ['preferOnHomepage', 'startDate'], 'asc').slice(0, 5)
    filteredEvents = helper.sortList(filteredEvents, 'startDate', 'asc')
  }
  return {
    allEvents: filteredEvents,
    allEventsStatus: state.allEvents.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents }, dispatch)
}

AllEventsContainer.propTypes = {
  allEventsStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  allEvents: PropTypes.array.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const AllEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(AllEventsContainer)

export default withErrorBoundary(AllEvents)
