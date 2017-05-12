import React from 'react'
import { connect } from 'react-redux'
import Navigation from './presenter'
import { openSearchDrawer, closeSearchDrawer, closeSearchBox } from '../../actions/search.js'

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.search,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openSearchDrawer: () => {
      dispatch(openSearchDrawer())
      dispatch(closeSearchBox())
    },
    closeSearchDrawer: () => {
      dispatch(closeSearchDrawer())
      dispatch(closeSearchBox())
    },
  }
}

const mergeProps = (state, dispatchProps, ownProps) => {
  return {
    handleDrawerClick: state.search.drawerOpen ? dispatchProps.closeSearchDrawer : dispatchProps.openSearchDrawer,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Navigation)
