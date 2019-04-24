import React, { Component } from 'react'
import Link from 'components/Interactive/Link'

class HomeHesburghBanner extends Component {
  render () {
    return (
      <hgroup className='fade'>
        <div className='container-fluid jesus'>
          <h1><Link to='/' title='Hesburgh Library Home' className='hlhome'>Hesburgh <em>Libraries</em></Link></h1>
        </div>
      </hgroup>
    )
  }
}

export default HomeHesburghBanner
