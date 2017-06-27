import React from 'react'
import { connect } from 'react-redux'
import Bool from './presenter'
import { setSearchOption } from '../../../../actions/advancedSearch'

const mapStateToProps = (state, ownProps) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Bool)
