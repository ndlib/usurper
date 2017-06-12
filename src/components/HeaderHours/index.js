'use strict'
import React, { Component } from 'react'
import '../../static/css/global.css'

class HeaderHours extends Component {
  render () {
    return (
      <div className='header-hours'>
        <p>Hesburgh Libraries Service Points: <a href='/hours/'>Open All Day</a></p>
      </div>
    )
  }
}

export default HeaderHours
