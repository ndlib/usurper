import { connect } from 'react-redux'
import React from 'react'

const Presenter = ({ message = '' }) => (
  <div className={'Loading'}>
    <h1>Loading</h1>
    <div>{ message }</div>
  </div>
)

export default connect()(Presenter)
