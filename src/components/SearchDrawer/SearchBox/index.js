import React from 'react'
import { connect } from 'react-redux'
import { openSearchBox } from '../../../actions/search.js'
import SearchBox from './presenter'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick:() => {
      ownProps.dispatch(openSearchBox())
    },
  }
}

export default connect(mapDispatchToProps)(SearchBox)
