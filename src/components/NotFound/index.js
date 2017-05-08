import { connect } from 'react-redux'
import React from 'react'

const Presenter = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound'}>
    <h1>Not Found</h1>
    <div>{ message }</div>
  </div>
)

export default connect()(Presenter)
