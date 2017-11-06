'use strict'
import React from 'react'
import { Route } from 'react-router'
import PreviewBanner from './PreviewBanner'
import BrandingBanner from './BrandingBanner'
import HesburghBanner from './HesburghBanner'
import Navigation from '../Navigation'
import SearchDrawer from '../SearchDrawer'
import GlobalAlert from '../Contentful/Alert/Global'
import '../../static/css/global.css'

const Header = (props) => {
  return (
    <div className='top'>
      <header id='banner'>
        <Route exact path='/preview/*' component={PreviewBanner} />
        <Route exact path='/' component={BrandingBanner} />
        <HesburghBanner />
        <GlobalAlert />
        <hgroup className='nav-search'>
          <Navigation {...props} />
          <SearchDrawer {...props} />
        </hgroup>
      </header>
    </div>
  )
}

export default Header
