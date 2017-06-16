import { connect } from 'react-redux'
import React from 'react'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound content'}>
  	<div className="notfound">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <div>{ message }</div>
    </div>
  </div>
)

export default NotFound
