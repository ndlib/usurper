import { connect } from 'react-redux'
import React from 'react'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound content'}>
    <h1>Not Found</h1>
    <div>{ message }</div>
  </div>
)

export default NotFound
