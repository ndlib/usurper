import React, { Component } from 'react'
import classnames from 'classnames'
import { Link } from 'react-router-dom'
import '../../static/css/global.css'
import PageWrapper from '../PageWrapper'
import HomePageHours from '../Hours/HomePage'
import HeaderHours from '../Hours/Header'

class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <PageWrapper>
          <HomePageHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
          <HeaderHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
        </PageWrapper>
      </div>
    )
  }
}

export default Home
