'use strict'
import React, { Component } from 'react'
import Dude from '../../../static/images/dude.png'
import Link from '../../Link'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <div className='container-fluid'>
        <h1><Link to='/' title='Hesburgh Library Home' className='hlhome'>Hesburgh <em>Libraries</em></Link></h1>
      </div>
    )
  }
}

export default HomeHesburghBanner
