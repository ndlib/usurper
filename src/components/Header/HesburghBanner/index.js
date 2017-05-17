'use strict'
import React, { Component } from 'react'
import Login from '../../Login'

import '../../../static/css/global.css'
class HomeHesburghBanner extends Component {
  render () {
    return (
      <div id='banner'>
        <div className='container-fluid'>
          <a href='/' className='hlhome'>Hesburgh <em>Libraries</em></a>
          <Login />
        </div>
      </div>
    )
  }
}

export default HomeHesburghBanner
