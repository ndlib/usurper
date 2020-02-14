import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import typy from 'typy'

import Presenter from './presenter'

import { fetchAllExhibits } from 'actions/contentful/allExhibits'
import * as statuses from 'constants/APIStatuses'
import * as dateLibs from 'shared/DateLibs'

export class PastExhibitsContainer extends Component {
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
  // Check for month filter
  const dateString = ownProps.match.params.date || ''
  const hasFilter = !!(dateString.match(/^\d{6}$/))

  let pageTitle = 'Past Exhibits'
  let pageDate
  let filterYear
  let filterMonth

  if (hasFilter) {
    pageTitle = `${pageTitle} - ${moment(dateString, 'YYYYMM').format('MMMM YYYY')}`
    pageDate = dateString
    filterYear = moment(dateString, 'YYYYMM').year()
    filterMonth = moment(dateString, 'YYYYMM').month()
  }

  const now = new Date()
  const exhibits = typy(state, 'allExhibits.json').safeArray.filter(entry => {
    const event = entry.event
    if (event && event.startDate && event.endDate) {
      return event.startDate < now && event.endDate < now
    }
    return false
  })
  const filteredExhibits = exhibits.filter(entry => {
    if (!entry.event) {
      return false
    }
    return hasFilter
      ? dateLibs.isInMonth(entry.event.startDate, entry.event.endDate, filterYear, filterMonth)
      : entry.event.endDate >= moment().subtract(30, 'days')
  })

  return {
    pageTitle,
    pageDate,
    exhibits,
    filteredExhibits,
    filterYear,
    filterMonth,
    allExhibitsStatus: allExhibits.status,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchAllExhibits }, dispatch)
}

PastExhibitsContainer.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  pageDate: PropTypes.string,
  filteredExhibits: PropTypes.array.isRequired,
  filterYear: PropTypes.number,
  filterMonth: PropTypes.number,
  allExhibitsStatus: PropTypes.string.isRequired,
  fetchAllExhibits: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
}

const PastExhibits = connect(mapStateToProps, mapDispatchToProps)(PastExhibitsContainer)

export default PastExhibits
