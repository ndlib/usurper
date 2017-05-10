import { connect } from 'react-redux'
import React, { Component } from 'react'
import WeeklyHoursListPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return ownProps;
}

const WeeklyHoursList = connect(
  mapStateToProps
)(WeeklyHoursListPresenter)

export default WeeklyHoursList
