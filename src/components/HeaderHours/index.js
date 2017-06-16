'use strict'
import React, { Component } from 'react'
import '../../static/css/global.css'
import Link from '../Link'
class HeaderHours extends Component {
  render () {
    return (
      <div className='header-hours'>
        <p>Hesburgh Libraries Service Points: <Link to='/hours/'>Open All Day</Link></p>
      </div>
    )
  }
}

export default HeaderHours
