'use strict'
import React, { Component } from 'react'
import '../../../static/css/global.css'

class HomeBanner extends Component {
  render () {
    return (
      <div id='wrapper'>
        <div className='gtype blue container-fluid' role='navigation' title='University of Notre Dame' id='header'>
          <div>
            <div className='nddotedu'><a href='http://nd.edu'>University <i>of</i> Notre Dame</a></div>
            <div className='dept-prov'><a href='http://provost.nd.edu'>Office <i>of the</i> Provost</a></div>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeBanner
