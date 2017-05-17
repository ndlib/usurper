'use strict'
import React from 'react'
import LoginStatus from '../Login'
import Recommendations from '../Recommendations'
import LoanResources from '../LoanResources'
import Courses from '../Courses'

const PersonalInfo = () => {
  return (
    <div className='container-fluid'>
      <LoginStatus />
      <Courses linkOnly />
      <Recommendations />
      <div><LoanResources /></div>
    </div>
  )
}

export default PersonalInfo
