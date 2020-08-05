import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'
import typy from 'typy'
import { initLogin } from 'actions/personal/token'
import { getReservations } from 'actions/personal/reservations'
import * as statuses from 'constants/APIStatuses'
import Presenter from './presenter'

export class ReservationsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    if (this.props.login.state === statuses.UNAUTHENTICATED) {
      this.props.initLogin()
    } else if (this.props.login.token && this.props.reservations.state === statuses.NOT_FETCHED) {
      const start = this.props.startDate.isValid() ? this.props.startDate.format('YYYY-MM-DD') : null
      const end = this.props.endDate.isValid() ? this.props.endDate.format('YYYY-MM-DD') : null
      this.props.getReservations(start, end)
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    return (
      <Presenter
        reservations={this.props.reservations.data}
        isLoading={[statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.reservations.state)}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
      />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state

  // Get date range from path parameters.
  // Expects the format: YYYYMMDD-YYYYMMDD (End date is optional when selecting a single date)
  // Result is a moment object, which later gets formatted to YYYY-MM-DD
  // Date range defaults to a 30 day window from today.
  const dateRange = typy(ownProps, 'match.params.dateRange').safeString.split('-')
  const startDate = dateRange[0] ? moment(dateRange[0], 'YYYYMMDD') : moment()
  const endDate = dateRange.length > 1
    ? moment(dateRange[1], 'YYYYMMDD')
    : (dateRange[0] ? moment(startDate) : moment(startDate).add(30, 'days'))

  return {
    login: personal.login,
    reservations: personal.reservations,
    startDate: startDate,
    endDate: moment.min(endDate, moment(startDate).add(13, 'days')),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ initLogin, getReservations }, dispatch)
}

ReservationsContainer.propTypes = {
  login: PropTypes.shape({
    state: PropTypes.string.isRequired,
    token: PropTypes.string,
  }).isRequired,
  initLogin: PropTypes.func.isRequired,
  reservations: PropTypes.shape({
    state: PropTypes.string.isRequired,
    data: PropTypes.array,
  }).isRequired,
  getReservations: PropTypes.func,
  startDate: PropTypes.object,
  endDate: PropTypes.object,
  match: PropTypes.shape({
    params: PropTypes.shape({
      dateRange: PropTypes.string,
    }),
  }),
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsContainer)
