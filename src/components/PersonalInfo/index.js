'use strict'
import React from 'react'
import LoginStatus from '../Login'
import Recommendations from '../Recommendations'
import LoanResources from '../LoanResources'
import Courses from '../Courses'
import PageWrapper from '../PageWrapper'

const PersonalInfo = () => {
  return (
    <PageWrapper >
      <div className='container-fluid'>
        <LoginStatus />
        <Courses linkOnly />
        <Recommendations />
        <div><LoanResources /></div>
      </div>
    </PageWrapper>
  )
}

export default PersonalInfo
