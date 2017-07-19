import React from 'react'
import Link from '../../Link'
import LandingPage from '../index.js'
const About = () => {
  return (

    <LandingPage title='About'>
      <div className='row'>
        <div className='col-md-4 col-xs-12'>
          <h3>People</h3>
          <ul className='child'>
            <li><Link to='/get-help'>Contact Us</Link></li>
            <li><Link to='http://directory.library.nd.edu/directory'>Faculty &amp; Staff Directory</Link></li>
            <li><Link to='/employment'> Employment Opportunities</Link></li>
          </ul>
        </div>
        <div className='col-md-4 col-xs-12'>
          <h3>Spaces</h3>
          <ul className='child'>
            <li><Link to='/maps'>Floor Maps &amp; Locations</Link></li>
            <li><Link to='http://renovation.library.nd.edu'>Hesburgh Library Renovation</Link></li>
          </ul>
        </div>
        <div className='col-md-4 col-xs-12'>
          <h3>Library Leadership</h3>
          <ul className='child'>
            <li><Link to='/mission-vision'>Mission and Vision</Link></li>
            <li><Link to='http://librarygiving.nd.edu'>Library Giving</Link></li>
            <li><Link to='/ucl'>University Committee on Libraries</Link></li>

          </ul>
        </div>
      </div>
    </LandingPage>

  )
}

export default About
