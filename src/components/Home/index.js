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

class Home extends Component {
  render () {
    return (
      <div className='Home main'>
        <PageTitle title='Hesburgh Library' hideInPage />
        <SearchProgramaticSet open />
        <HomePageHours />

        <section className=' services hservices' aria-label='Quicklinks'>
          <div className='-col-sm-3 -col-xs-6 one'>
            <Link to='/personal' title='My Account'><img src={Account} alt='My Account. ' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 two'>
            <Link to='/courses' title='Course Reserves'><img src={Reserves} alt='Course Reserves' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 three'>
            <Link to='http://directory.library.nd.edu/directory/subjects' title='Find Your Librarian' noTarget><img src={Find} alt='Find Your Librarian ' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 four'>
            <Link to='http://nd.libcal.com/#s-lc-box-2749-container-tab1' title='Reserve a Room'><img src={Room} alt='Reserve a Room. ' aria-hidden /></Link>
          </div>
          <div className='-col-sm-3 -col-xs-6 five'>
            <Link to='/technology-lending' title='Technology Lending'><img src={Tech} alt='Technology Lending.' aria-hidden /></Link>
          </div>
        </section>
        <div className='row news'>
          <News />
          <Events />
        </div>
      </div>
    )
  }
}

export default Home
