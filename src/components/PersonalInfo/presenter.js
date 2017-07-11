'use strict'
import React from 'react'
import Recommendations from '../Recommendations'
import LoanResources from '../LoanResources'
import Courses from '../Courses'
import PageTitle from '../PageTitle'
import Loading from '../Messages/Loading'
import SearchProgramaticSet from '../SearchProgramaticSet'
import LogOut from '../LogOut'
import StaticSidebar from '../Contentful/StaticContent/Sidebar'
import StaticBody from '../Contentful/StaticContent/Body'

const LoggedIn = () => {
  return (
    <div className='content'>
      <Courses linkOnly />
      <LogOut />
      <SearchProgramaticSet open={false} />
      <PageTitle title='Items & Requests' />
      <div className='row'>
        <div className='col-md-8 col-sm-7'>
          <Recommendations />
          <div><LoanResources /></div>
          <StaticBody slug='personal' preview={true} />
        </div>
        <StaticSidebar slug='personal' preview={true} />
      </div>
    </div>
  )
}

const Presenter = (props) => {
  if (props.loggedIn) {
    return LoggedIn()
  } else if (props.redirectUrl) {
    window.location = props.redirectUrl
  } else {
    return <Loading message='Loading Your Account' />
  }
}

export default Presenter
