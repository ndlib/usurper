import React from 'react'

import ServiceLink from './ServiceLink'

import accountIcon from 'static/images/icons/account.svg'
import coursesIcon from 'static/images/icons/reserves.svg'
import subjectsIcon from 'static/images/icons/subjects.svg'
import roomsIcon from 'static/images/icons/library.svg'
import computerIcon from 'static/images/icons/computer.svg'
import './style.css'

const FeaturedServices = () => {
  return (
    <React.Fragment>
      <h2 className='skiplink'>Quicklinks</h2>
      <section className='featured-services' aria-label='Quicklinks' role='navigation'>
        <div className='list-items'>
          <ServiceLink url='/items-requests' title='My Account' icon={accountIcon} />
          <ServiceLink url='/courses' title='Course Reserves' icon={coursesIcon} />
          <ServiceLink url='/subjects' title='Subjects A-Z' icon={subjectsIcon} />
          <ServiceLink
            url='http://nd.libcal.com/#s-lc-box-2749-container-tab1'
            title={`Study & Media Rooms`}
            icon={roomsIcon}
          />
          <ServiceLink
            url='https://m.nd.edu/current_students/student_computer_labs'
            title='Computer Availability'
            icon={computerIcon}
          />
        </div>
      </section>
    </React.Fragment>
  )
}

export default FeaturedServices
