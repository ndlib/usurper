import { connect } from 'react-redux'
import React from 'react'

const Loading = ({ message = '' }) => (
  <div className={'Loading content'}>
    <h1>Loading</h1>
    <div>{ message }</div>
  </div>
)

export default Loading
