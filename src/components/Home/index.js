import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import '../../static/css/global.css'
import HomeHeader from './HomeHeader'
import HomePageHours from '../Hours/HomePage'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <HomeHeader {...this.props} />
        <HomePageHours jsonHoursApiKey="hesburghlibrariesservicepoints" />
      </div>
    )
  }
}

export default Home
