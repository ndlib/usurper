'use strict'
import React from 'react'
import Recommendations from '../Recommendations'
import LoanResources from '../LoanResources'
import Courses from '../Courses'
import PageTitle from '../PageTitle'
import Loading from '../Messages/Loading'
import SearchProgramaticSet from '../SearchProgramaticSet'

const LoggedIn = () => {
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
