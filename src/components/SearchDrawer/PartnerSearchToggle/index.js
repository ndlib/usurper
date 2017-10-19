import React from 'react'
import { connect } from 'react-redux'
import Presenter from './presenter'
import { setSearchOption } from '../../../actions/advancedSearch'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.checked))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Presenter)
