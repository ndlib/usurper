'use strict'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import LoginStatus from '../Login'
import Recommendations from '../Recommendations'
import Resources from '../Resources'
import Courses from '../Courses'

class PersonalInfo extends Component {

  componentDidMount () {
    document.title = "Resources | Hesburgh Library"
  }

  render () {
    return (
      <div className='container-fluid'>
        <LoginStatus />
        <Courses linkOnly={true} />
        <Recommendations />
        <div><Resources /></div>
      </div>
    )
  }
}

PersonalInfo.propTypes = {
  params: PropTypes.object,
}

export default PersonalInfo
