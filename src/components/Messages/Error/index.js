import { connect } from 'react-redux'
import React from 'react'

const Error = ({ message = "An error has occured" }) => (
  <div className={'Error'}>
    <h1>Error</h1>
    <div>{ message }</div>
  </div>
)

export default Error
