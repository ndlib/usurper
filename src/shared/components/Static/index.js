import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './style.css'

class Static extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='Static'>
        <div className='App-header'>
          <h2>Welcome to Static Page</h2>
          <Link to='/'>Home</Link>
          <br />
          <Link to='/another-page'>Another page.</Link>
        </div>
      </div>
    )
  }
}

export default Static
