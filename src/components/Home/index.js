import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import '../../static/css/global.css'
import HomeHeader from './HomeHeader'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <HomeHeader {...this.props} />
      </div>
    )
  }
}

export default Home
