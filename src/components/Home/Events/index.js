import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { fetchAllEvents } from 'actions/contentful/allEvents'
import { fetchAllEventGroups } from 'actions/contentful/allEventGroups'
import Presenter from './presenter.js'
import PresenterFactory from 'components/APIInlinePresenterFactory'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import Config from 'shared/Configuration'

export class HomeEventsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  checkFullyLoaded () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allEventGroups.status === statuses.NOT_FETCHED) {
      this.props.fetchAllEventGroups(preview)
    } else if (this.props.allEventGroups.status === statuses.SUCCESS && this.props.allEventsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllEvents(preview, this.props.allEventGroups.json)
    }
  }

  render () {
    return (
      <PresenterFactory presenter={Presenter} props={{ entries: this.props.allEvents }} status={this.props.combinedStatus} />
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
    filteredEvents = helper.sortList(filteredEvents, ['preferOnHomepage', 'startDate'], 'asc').slice(0, Config.features.exhibitsEnabled ? 6 : 5)
    filteredEvents = helper.sortList(filteredEvents, 'startDate', 'asc')
  }
  const combinedStatus = helper.reduceStatuses([
    state.allEvents.status,
    state.allEventGroups.status,
  ])
  return {
    allEvents: filteredEvents,
    allEventsStatus: state.allEvents.status,
    allEventGroups: state.allEventGroups,
    combinedStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllEvents, fetchAllEventGroups }, dispatch)
}

HomeEventsContainer.propTypes = {
  allEventsStatus: PropTypes.string.isRequired,
  combinedStatus: PropTypes.string.isRequired,
  fetchAllEvents: PropTypes.func.isRequired,
  fetchAllEventGroups: PropTypes.func.isRequired,
  allEvents: PropTypes.array.isRequired,
  allEventGroups: PropTypes.shape({
    status: PropTypes.string.isRequired,
    json: PropTypes.array,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const HomeEvents = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeEventsContainer)

export default HomeEvents
