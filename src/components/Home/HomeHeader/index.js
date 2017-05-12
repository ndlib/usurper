'use strict'
import React, { Component } from 'react'
import HomeBanner from './HomeBanner'
import HomeHesburghBanner from './HomeHesburghBanner'
import FeedbackButton from '../../FeedbackButton'
import Navigation from '../../Navigation'
import SearchDrawer from '../../SearchDrawer'
import '../../../static/css/global.css'

class HomeHeader extends Component {
  render () {
    return (
      <div className='top'>
        <HomeBanner />
        <HomeHesburghBanner />
        <FeedbackButton />
        <div className='nav-search'>
          <Navigation {...this.props} />
          <SearchDrawer {...this.props} />
        </div>
      </div>

    )
  }
}

export default HomeHeader
