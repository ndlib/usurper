import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './style.css'

import Login from '../Login'

class Home extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='Home'>
        <div className='App-header'>
          <Login />
          <h2>Welcome to React</h2>
          <div><Link to='/about'>About Page.</Link></div>
          <div><Link to={ '/borrow-renew-request' }>Borrow</Link></div>
        </div>
      </div>
    )
  }
}

export default Home
