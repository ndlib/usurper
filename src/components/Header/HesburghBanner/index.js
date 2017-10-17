'use strict'
import React, { Component } from 'react'
import Dude from '../../../static/images/dude.png'
import Link from '../../Link'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <div>
        <header id='banner' title='Website Home'>
          <div className='container-fluid'>
            <Link to='/' title='Hesburgh Library Home' className='hlhome'>Hesburgh <em>Libraries</em></Link>
          </div>
        </header>
      </div>
    )
  }
}

export default HomeHesburghBanner
