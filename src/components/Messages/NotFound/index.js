import { connect } from 'react-redux'
import React from 'react'

const NotFound = ({ message = 'The requested page could not be found' }) => (
  <div className={'NotFound content'}>
  	<div className="notfound">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <div>{ message }</div>

    <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    </div>
  </div>
)

export default NotFound
