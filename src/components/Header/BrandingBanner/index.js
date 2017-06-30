'use strict'
import React, { Component } from 'react'
import '../../../static/css/global.css'


class HomeBanner extends Component {
  render () {
    return (
      <div id='wrapper'>
        <header className='gtype blue container-fluid' role='Navigation' title='University of Notre Dame' id='header'>
          <hgroup>
            <h3 className='nddotedu'><a href='http://nd.edu'>University <i>of</i> Notre Dame</a></h3>
            <h2 className='dept-prov'><a href='http://provost.nd.edu'>Office <i>of the</i> Provost</a></h2>
          </hgroup>
        </header>
      </div>
    )
  }
}

export default HomeBanner
