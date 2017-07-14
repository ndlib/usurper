import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'
import Link from '../../Link'

const FooterLinks = () => {
  return (
    <div id='footer-links'>
      <div className='container-fluid'>
        <div className='row bottom-xs'>
          <div className='col-xs-7'>
            <div className='box'>
              <ul role='navigation' aria-label='Footer Menu'>
                <li><Link to={`https://nd.service-now.com/ess/create_lib_incident.do?URL=${window.location}&lib_list_problem=lib_list_web_content`}>Website Feedback</Link></li>
                <li><Link to='/library-policies'>Library Policies</Link></li>
                <li><Link to='http://librarygiving.nd.edu'>Library Giving</Link></li>
                <li><Link to='/employment/'>Jobs</Link></li>
                <li><Link to='https://wiki.nd.edu/display/libintranet/Home'>Hesnet</Link></li>
                <li><Link to={`https://nd.service-now.com/ess/create_lib_incident.do?URL=${window.location}`}>Report A Problem</Link></li>
              </ul>
            </div>
          </div>

          <div className='col-xs-3 col-xs-offset-2'>
            <div className='box right'>
              <ul role='navigation' aria-label='Social Media Links'>
                <li><Link to='http://twitter.com/ndlibraries' title='Hesburgh Libraries Twitter' target='_blank'><img src={Twitter} alt='Twitter' /> NDLibraries</Link></li>
                <li><Link to='https://www.facebook.com/NDLibraries/' title='Hesburgh Libraries Faceebook' target='_blank'><img src={Facebook} alt='Facebook' /> NDLibraries</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
