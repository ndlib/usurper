import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchHours } from '../../../actions/hours'
import HoursPagePresenter from './presenter.js'
import PresenterFactory from '../../APIPresenterFactory'
import * as statuses from '../../../constants/APIStatuses'

const mapStateToProps = (state) => {
  return { hoursEntry: state.hours }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchHours }, dispatch)
}

export class HoursPageContainer extends Component {
  componentDidMount () {

    if (this.props.hoursEntry.status === statuses.NOT_FETCHED) {
      this.props.fetchHours()
    }
  }

  render () {
    return <PresenterFactory presenter={ HoursPagePresenter } slice={ this.props.hoursEntry } />
  }
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursPageContainer)

export default HoursPage
