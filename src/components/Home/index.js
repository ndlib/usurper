import React, { Component } from 'react'
import '../../static/css/global.css'
import HomePageHours from '../Hours/HomePage'
import HeaderHours from '../Hours/Header'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <HomePageHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
        <HeaderHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
      </div>
    )
  }
}

export default Home
