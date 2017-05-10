import React from 'react'
import { connect } from 'react-redux'
import Navigation from './presenter'
import { openSearchDrawer, closeSearchDrawer, closeSearchBox } from '../../actions/search.js'
const mapStateToProps = (state) => {
  return {
    search: state.search
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
