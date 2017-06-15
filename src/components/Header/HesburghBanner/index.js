'use strict'
import React, { Component } from 'react'
import Login from '../../Login'
import Dude from '../../../static/images/dude.png'
import Link from '../../Link'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <div>
        <div className='alpha'>
          <div>
            <Link to='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>
              <img src={Dude} />

             Alpha Preview
            </Link>
          </div>
        </div>
        <div id='banner'>
          <div className='container-fluid'>
            <Link to='/' className='hlhome'>Hesburgh <em>Libraries</em></Link>
            <Login />
          </div>
        </div>
      </div>
    )
  }
}

export default HomeHesburghBanner
