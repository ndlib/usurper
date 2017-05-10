// Container component for a Page content type from Contentful
import { connect } from 'react-redux'
import { fetchHours } from '../../../actions/hours'
import React from 'react'
import HoursPagePresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return { hoursEntry: state.hours }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  dispatch(fetchHours());
  return {}
}

const HoursPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(HoursPagePresenter)

export default HoursPage
