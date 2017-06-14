'use strict'
import React from 'react'
import { Route } from 'react-router'
import PreviewBanner from './PreviewBanner'
import BrandingBanner from './BrandingBanner'
import HesburghBanner from './HesburghBanner'
import FeedbackButton from '../FeedbackButton'
import Navigation from '../Navigation'
import SearchDrawer from '../SearchDrawer'
import '../../static/css/global.css'

const Header = (props) => {
  return (
    <div className='top'>
      <Route exact path='/preview/*' component={PreviewBanner} />
      <Route exact path='/' component={BrandingBanner} />
      <HesburghBanner />
      <FeedbackButton />
      <div className='nav-search'>
        <Navigation {...props} />
        <SearchDrawer {...props} />
      </div>
    </div>
  )
}

export default Header
