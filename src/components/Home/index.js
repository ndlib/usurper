import React, { Component } from 'react'
import '../../static/css/global.css'

import Link from '../Link'
import HomePageHours from '../Hours/HomePage'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import News from './News'
import Events from './Events'
import Reserves from '../../static/images/reserves.jpg'
import Account from '../../static/images/myaccount.jpg'
import Room from '../../static/images/reserveroom.jpg'
import Tech from '../../static/images/tech.jpg'
import Find from '../../static/images/findlibrarian.jpg'
import '../../static/images/icons/favicon.ico'
import '../../static/images/icons/android-chrome-192x192.png'
import '../../static/images/icons/android-chrome-256x256.png'
import '../../static/images/icons/apple-touch-icon.png'
import '../../static/images/icons/browserconfig.xml'
import '../../static/images/icons/favicon-16x16.png'
import '../../static/images/icons/favicon-32x32.png'
import '../../static/images/icons/manifest.json'
import '../../static/images/icons/mstile-150x150.png'
import '../../static/images/icons/safari-pinned-tab.svg'

class Home extends Component {
  render () {
    return (
      <div className='Home main'>
        <PageTitle tile='Hesburgh Library' />
        <SearchProgramaticSet open />
        <HomePageHours jsonHoursApiKey='hesburghlibrary' />

        <div className=' services hservices'>
          <div className='-col-sm-3 -col-xs-6'>
            <Link to='/personal' title='My Account'><img src={Account} alt='My Account. ' /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6'>
            <Link to='/courses' title='Course Reserves'><img src={Reserves} alt='Course Reserves. A row of textbooks.' /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6'>
            <Link to='/subject-librarians' title='Find Your Librarian'><img src={Find} alt='Find Your Librarian ' /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6'>
            <Link to='http://nd.libcal.com/#s-lc-box-2749-container-tab1' title='Reserve a Room'><img src={Room} alt='Reserve a Room. Students sitting at a table receiving instruction.' /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6'>
            <Link to='/technology-lending' title='Technology Lending'><img src={Tech} alt='Technology Lending. Hand holding an iPad in a classroom.' /></Link>
          </div>
        </div>
        <div className='row news'>
          <News />
          <Events />
        </div>
      </div>
    )
  }
}

export default Home
