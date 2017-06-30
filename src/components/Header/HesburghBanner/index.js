'use strict'
import React, { Component } from 'react'
import Dude from '../../../static/images/dude.png'
import Link from '../../Link'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <div>
        <div className='alpha'>
          <div>
            <Link to='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>
              <img alt="" src={Dude} aria-hidden="true" />
              Alpha Preview
            </Link>
          </div>
        </div>
        <header id='banner' title='Website Home'>
          <div className='container-fluid'>
            <Link to='/'  title="Hesburgh Library Home" className='hlhome'>Hesburgh <em>Libraries</em></Link>
          </div>
        </header>
      </div>
    )
  }
}

export default HomeHesburghBanner
