'use strict'
import React from 'react'
import { connect } from 'react-redux'

import Resources from './presenter'

function mapStateToProps (state) {
  const { personal } = state
  var resources = Object.assign({}, personal.resources_have, personal.resources_pending)
  return { token: personal.token, resources: resources }
}

export default connect(mapStateToProps)(Resources)
