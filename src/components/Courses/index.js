import React from 'react'
import { connect } from 'react-redux'

import Courses from './presenter'

function mapStateToProps (state) {
  const { personal } = state
  return { token: personal.token, courses: personal.courses }
}

export default connect(mapStateToProps)(Courses)
