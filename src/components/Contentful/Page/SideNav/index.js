import React from 'react'
import { connect } from 'react-redux'
import SideNavPresenter from './presenter.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    search: state.search,
  }
}

export default connect(
  mapStateToProps
)(SideNavPresenter)
