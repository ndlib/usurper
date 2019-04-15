import React, { Component } from 'react'
import '../../../../static/css/global.css'

class HomeBanner extends Component {
  render () {
    return (
      <hgroup id='wrapper'>
        <div className='gtype blue container-fluid' id='header'>
          <nav aria-label='University of Notre Dame'>
            <div className='nddotedu'><a href='http://nd.edu'>University <i>of</i> Notre Dame</a></div>
            <div className='dept-prov'><a href='http://provost.nd.edu'>Office <i>of the</i> Provost</a></div>
          </nav>
        </div>
      </hgroup>
    )
  }
}

export default HomeBanner
