import React, { Component } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import './style.css'

class Static extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='Static'>
        <div className='App-header'>
          <h2>Welcome to Static Page</h2>
          <Link to='/'>Home</Link>
        </div>
      </div>
    )
  }
}

export default Static
