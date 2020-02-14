import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllExhibits } from 'actions/contentful/allExhibits'
import * as statuses from 'constants/APIStatuses'

export class CurrentExhibitsContainer extends Component {
  componentDidMount () {
    const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
    if (this.props.allExhibitsStatus === statuses.NOT_FETCHED) {
      this.props.fetchAllExhibits(preview)
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { allExhibits } = state
  // Check for date filter
  const dateString = ownProps.match.params.date || ''
  const hasFilter = !!(dateString.match(/^\d{8}$/))

  let pageTitle = 'Current Exhibits'
  let pageDate

  if (hasFilter) {
    pageTitle = `Exhibits on ${moment(dateString, 'YYYYMMDD').format('MMM Do YYYY')}`
    pageDate = dateString
  }

  const now = new Date()
  const exhibits = typy(state, 'allExhibits.json').safeArray.filter(entry => {
    const event = entry.event
    if (event && event.startDate && event.endDate) {
      return event.startDate >= now || event.endDate >= now
    }
    return false
  })
  const filteredExhibits = hasFilter ? exhibits.filter(entry => {
    if (!entry.event) {
      return false
    }
    const start = moment(entry.event.startDate).format('YYYYMMDD')
    const end = moment(entry.event.endDate).format('YYYYMMDD')
    return start === dateString || end === dateString || (start < dateString && end >= dateString)
  }) : exhibits

  return {
    pageTitle,
    pageDate,
    hasFilter,
    exhibits,
    filteredExhibits,
    allExhibitsStatus: allExhibits.status,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllExhibits }, dispatch)
}

CurrentExhibitsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  hasFilter: PropTypes.bool,
  exhibits: PropTypes.arrayOf(PropTypes.shape({
    event: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date),
    }),
  })).isRequired,
  filteredExhibits: PropTypes.array.isRequired,
  allExhibitsStatus: PropTypes.string.isRequired,
  fetchAllExhibits: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }).isRequired,
}

const CurrentExhibits = connect(mapStateToProps, mapDispatchToProps)(CurrentExhibitsContainer)

export default CurrentExhibits
