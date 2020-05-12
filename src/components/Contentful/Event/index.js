import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchEvent } from 'actions/contentful/event'
import { fetchAllEventGroups } from 'actions/contentful/allEventGroups'
import PresenterFactory from 'components/APIPresenterFactory'
import ContentfulEventPresenter from './presenter.js'
import { withErrorBoundary } from 'components/ErrorBoundary'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export class ContentfulEventContainer extends Component {
  componentDidMount () {
    const eventSlug = this.props.match.params.id

    if (!this.props.data || this.props.data.slug !== eventSlug) {
      // If event groups have already been fetched, get the event
      if (this.props.allEventGroups.status === statuses.SUCCESS) {
        this.props.fetchEvent(eventSlug, this.props.preview, this.props.allEventGroups.json)
      } else if (this.props.allEventGroups.status !== statuses.FETCHING) {
        // Fetch event groups (this has to happen before fetchEvent so we can identify recurring events)
        this.props.fetchAllEventGroups(this.props.preview)
      }
    }
  }

  componentDidUpdate (prevProps) {
    const oldSlug = prevProps.match.params.id
    const newSlug = this.props.match.params.id
    const oldGroupStatus = prevProps.allEventGroups.status
    const newGroupStatus = this.props.allEventGroups.status
    if ((newSlug !== oldSlug && newGroupStatus === statuses.SUCCESS) ||
      (newGroupStatus === statuses.SUCCESS && oldGroupStatus !== statuses.SUCCESS)) {
      this.props.fetchEvent(newSlug, this.props.preview, this.props.allEventGroups.json)
    }
  }

  render () {
    return <PresenterFactory
      presenter={ContentfulEventPresenter}
      status={this.props.status}
      props={{ entry: this.props.data }} />
  }
}

const mapStateToProps = (state, ownProps) => {
  const combinedStatus = helper.reduceStatuses([
    state.cfEventEntry.status,
    state.allEventGroups.status,
  ])
  return {
    status: combinedStatus,
    data: state.cfEventEntry.json,
    preview: (new URLSearchParams(ownProps.location.search)).get('preview') === 'true',
    allEventGroups: state.allEventGroups,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchEvent, fetchAllEventGroups }, dispatch)
}

ContentfulEventContainer.propTypes = {
  fetchEvent: PropTypes.func.isRequired,
  fetchAllEventGroups: PropTypes.func.isRequired,
  data: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  allEventGroups: PropTypes.shape({
    status: PropTypes.string.isRequired,
    json: PropTypes.array,
  }).isRequired,
  status: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  preview: PropTypes.bool,
}

export const ContentfulEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentfulEventContainer)

export default withErrorBoundary(ContentfulEvent)
