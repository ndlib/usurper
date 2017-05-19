import React from 'react'
import { connect } from 'react-redux'
import PageWrapper from './presenter.js'
import { closeSearchBox } from '../../actions/search.js'
import { closeMenus } from '../../actions/menu.js'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
    ...ownProps,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickOnPage: () => {
      dispatch(closeSearchBox())
      dispatch(closeMenus())
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapper)
