'use strict'
import React, { Component } from 'react'
import '../../../static/css/global.css'

class HomeBanner extends Component {
  render () {
    return (
      <div id='wrapper'>
        <header className='gtype blue container-fluid' role='navigation' title='University of Notre Dame' id='header'>
          <hgroup>
            <div className='nddotedu'><a href='http://nd.edu'>University <i>of</i> Notre Dame</a></div>
            <div className='dept-prov'><a href='http://provost.nd.edu'>Office <i>of the</i> Provost</a></div>
          </hgroup>
        </header>
      </div>
    )
  }
}

export default HomeBanner
