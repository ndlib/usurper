import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import './style.css'

class Home extends Component {
  render () {
    const { className, ...props } = this.props
    return (
      <div className='Home'>
        <div className='App-header'>
          <h2>Welcome to React</h2>
          <div>Some text</div>
          <Link to='/fake-page'>Another page.</Link>
        </div>
      </div>
    )
  }
}

export default Home
