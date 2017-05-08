'use strict'
import React, { Component } from 'react'
import '../../static/css/global.css'
import '../../static/css/home.css'

class HeaderHours extends Component {
  render () {
    return (
      <div className='header-hours'>
        <p>Hesburgh Libraries Service Points: <a href='/page/hours/'>Open All Day</a></p>
      </div>
    )
  }
}

export default HeaderHours
