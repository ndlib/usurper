'use strict'
import React, { Component } from 'react'
import HeaderHours from '../../../HeaderHours'
import Login from '../../../Login'

import style from '../../../../static/css/global.css'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <div id='banner'>
        <div className='container-fluid'>
          <a href='/' className='hlhome'>Hesburgh <em>Libraries</em></a>
          <HeaderHours />
          <Login />
        </div>
      </div>
    )
  }
}

export default HomeHesburghBanner
