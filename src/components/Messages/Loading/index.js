import { connect } from 'react-redux'
import React from 'react'

const Loading = ({ message = '' }) => (
  <div className={'Loading content'}>
    <h1>Loading</h1>
    	<div className="sk-three-bounce">
        	<div className="sk-child sk-bounce1"></div>
        	<div className="sk-child sk-bounce2"></div>
        	<div className="sk-child sk-bounce3"></div>
      	</div>
    <div>{ message }</div>
  </div>
)

export default Loading
