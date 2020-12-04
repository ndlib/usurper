import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import Presenter from './presenter'

import { fetchGrouping } from 'actions/contentful/grouping'
import { mapEvent } from 'reducers/contentful/event'
import * as statuses from 'constants/APIStatuses'

export class EventGroupContainer extends Component {
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
    if (this.props.fetchStatus === statuses.NOT_FETCHED) {
      this.props.fetchGrouping(this.props.groupId, preview, 2)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { grouping } = state

  const groupId = ownProps.match.params.groupId
  const fetchStatus = typy(grouping, `${groupId}.status`).safeString || statuses.NOT_FETCHED
  const group = typy(grouping, `${groupId}.data`).safeObject
  const events = (fetchStatus === statuses.SUCCESS)
    ? typy(grouping, `${groupId}.data.fields.items`).safeArray.map(mapEvent)
    : []

  return {
    groupId,
    fetchStatus,
    group,
    events,
    pageTitle: `Event Series${group ? ` - ${typy(group, 'fields.displayName').safeString}` : ''}`,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchGrouping }, dispatch)
}

EventGroupContainer.propTypes = {
  groupId: PropTypes.string.isRequired,
  fetchStatus: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  fetchGrouping: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      groupId: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const EventGroup = connect(mapStateToProps, mapDispatchToProps)(EventGroupContainer)

export default EventGroup
