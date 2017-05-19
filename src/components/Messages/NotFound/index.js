import { connect } from 'react-redux'
import React from 'react'
import '../../../static/css/global.css'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound'}>
    <h1>Not Found</h1>
    <div>{ message }</div>
  </div>
)

export default NotFound
