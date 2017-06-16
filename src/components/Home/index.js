import React, { Component } from 'react'
import '../../static/css/global.css'
import Link from '../Link'
import HomePageHours from '../Hours/HomePage'
import PageTitle from '../PageTitle'
import FakeNews from './FakeNews'
import Reserves from '../../static/images/reserves.jpg'
import Account from '../../static/images/myaccount.jpg'
import Room from '../../static/images/reserveroom.jpg'

class Home extends Component {
  render () {
    return (
      <div className='Home main'>
        <PageTitle tile='Hesburgh Library' />
        <HomePageHours jsonHoursApiKey='hesburghlibrary' />
        <div className='row services'>
          <div className='col-sm-4 col-xs-4'>
            <Link to='https://reserves.library.nd.edu' title='Course Reserves'><img src={Reserves} alt='Course Reserves. A row of textbooks.' /></Link>
          </div>
          <div className='col-sm-4 col-xs-4'>
            <Link to='https://nd.illiad.oclc.org/illiad/IND/illiad.dll' title='My Account'><img src={Account} alt='My Account. ' /></Link>
          </div>
          <div className='col-sm-4 col-xs-4'>
            <Link to='http://nd.libcal.com/#s-lc-box-2749-container-tab1' title='Reserve a Room'><img src={Room} alt='Reserve a Room. Students sitting at a table receiving instruction.' /></Link>
          </div>
          <FakeNews />
        </div>
      </div>
    )
  }
}

export default Home
