import React from 'react'

import ServiceLink from './ServiceLink'

import accountIcon from 'static/images/icons/account.svg'
import coursesIcon from 'static/images/icons/reserves.svg'
import subjectsIcon from 'static/images/icons/subjects.svg'
import roomsIcon from 'static/images/icons/library.svg'
import studySpaceIcon from 'static/images/icons/studySpace.svg'
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
            url='https://libcal.library.nd.edu/reserve/hesburgh-library-study-media-rooms'
            title={`Study & Media Rooms`}
            icon={roomsIcon}
          />
          <ServiceLink
            url='/study-spaces'
            title={`Find a Study Space`}
            icon={studySpaceIcon}
          />
          <ServiceLink
            url='https://libcal.library.nd.edu/reserve/hesburgh-library-computer-stations'
            title='Reserve a Computer'
            icon={computerIcon}
          />
        </div>
      </section>
    </React.Fragment>
  )
}

export default FeaturedServices
