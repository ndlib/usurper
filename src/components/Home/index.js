import React, { Component } from 'react'
import '../../static/css/global.css'

import HomePageHours from '../Hours/HomePage'
import HeaderHours from '../Hours/Header'
import PageTitle from '../PageTitle'
import Reserves from '../../static/images/reserves.jpg'
import Ill from '../../static/images/ill.jpg'
import Room from '../../static/images/reserveroom.jpg'


class Home extends Component {
  render () {
    return (
      <div className='Home main'>

        <PageTitle tile='Hesburgh Library' />
        <HomePageHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
        <HeaderHours jsonHoursApiKey='hesburghlibrariesservicepoints' />
        <div className='row services'>
			<div className='col-sm-4 col-xs-4'>
				<a href='https://reserves.library.nd.edu" title="Course Reserves'><img src={Reserves} alt='Course Reserves. A row of textbooks.' /></a>
			</div>
			<div className='col-sm-4 col-xs-4'>
				<a href='https://nd.illiad.oclc.org/illiad/IND/illiad.dll' title='Interlibrary Loan and Document Delivery'><img src={Ill} alt='Interlibrary Loan and Document Delivery.  A graphical representation of two libraries exchanging infromation.' /></a>
			</div>
			<div className='col-sm-4 col-xs-4'>
				<a href='http://nd.libcal.com/#s-lc-box-2749-container-tab1' title='Reserve a Room'><img src={Room} alt='Reserve a Room. Students sitting at a table receiving instruction.' /></a>
			</div>
    	</div>
      </div>
    )
  }
}

export default Home
