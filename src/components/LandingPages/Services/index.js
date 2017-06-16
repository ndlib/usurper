import React from 'react'
import Link from '../../Link'
import ReserveRoom from '../../../static/images/reserveroom.jpg'
import LandingPage from '../index.js'

const Services = () => {
  return (

    <LandingPage title='Services' className='content'>

      <h1>All Services</h1>
      <hr />
      <p>A description about the services</p>

      <div className='row'>
        <div className='col-md-4 col-xs-12'>
          <h3>Featured Services</h3>

          <p><Link to='/room-reservations/'><img src={ReserveRoom} /></Link></p>

        </div>
        <div className='col-md-4 col-md-offset-1 col-xs-12'>
          <h3>Borrowing</h3>

          <p><Link to='/borrow-renew-request/'>Borrow, Renew, Request Policies</Link> </p>

          <p><Link to='/technology-lending/'>Technology Lending Policies</Link> </p>

          <p>&nbsp;</p>

          <h3>Teaching and Consulting</h3>

          <p><Link to='/request-library-research-instruction/'>Request Library Research Instruction</Link> </p>

          <p><Link to='/workshops/'>Workshops</Link> </p>

          <p><Link to='/thesis-dissertation-camps/'>Thesis and Dissertation Camps</Link> </p>

          <p><Link to='/consultation-teaching/'>Consultations (Meet with a Librarian)</Link> </p>

        </div>
      </div>
    </LandingPage>
  )
}

export default Services
