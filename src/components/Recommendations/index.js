import React from 'react'
import { connect } from 'react-redux'

import Recommendations from './presenter'

const mapStateToProps = (state) => {
  const { personal } = state
  return { recommend: personal.recommend }
}

export default connect(mapStateToProps)(Recommendations)
