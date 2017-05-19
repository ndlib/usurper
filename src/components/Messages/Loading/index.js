import { connect } from 'react-redux'
import React from 'react'
import '../../../static/css/global.css'

const Loading = ({ message = '' }) => (
  <div className={'Loading'}>
    <h1>Loading</h1>
    <div>{ message }</div>
  </div>
)

export default Loading
