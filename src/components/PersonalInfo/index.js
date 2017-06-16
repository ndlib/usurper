'use strict'
import React from 'react'
import Recommendations from '../Recommendations'
import LoanResources from '../LoanResources'
import Courses from '../Courses'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'

const PersonalInfo = () => {
  return (
    <div className='container-fluid content'>
      <PageTitle title='Items' />
      <SearchProgramaticSet open={false} />
      <Courses linkOnly />
      <Recommendations />
      <div><LoanResources /></div>
    </div>
  )
}

export default PersonalInfo
