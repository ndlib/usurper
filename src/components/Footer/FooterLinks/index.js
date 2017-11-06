import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'
import Gov from '../images/fdlp-emblem-color.png'
import Link from '../../Link'
import ServiceNowLink from '../../ServiceNowLink'

const FooterLinks = () => {
  return (
    <div id='footer-links'>
      <div className='container-fluid'>
        <div className='row bottom-xs'>
          <div className='col-xs-8'>
            <div className='box'>
              <ul role='navigation' aria-label='Footer Menu'>
                <li><ServiceNowLink isWebContent>Website Feedback</ServiceNowLink></li>
                <li><Link to='/library-policies'>Library Policies</Link></li>
                <li><Link to='http://librarygiving.nd.edu'>Library Giving</Link></li>
                <li><Link to='/employment/'>Jobs</Link></li>
                <li><Link to='https://wiki.nd.edu/display/libintranet/Home'>Hesnet</Link></li>
                <li><ServiceNowLink>Report A Problem</ServiceNowLink></li>
                <li><Link to='https://library.nd.edu/government-documents'><img src={Gov} className='gov' alt='Federal Depository Library' /></Link></li>
              </ul>
            </div>
          </div>

          <div className='col-xs-4'>
            <div className='box right'>
              <ul>
                <li><Link to='http://twitter.com/ndlibraries' title='Hesburgh Libraries Twitter' target='_blank' rel='noopener'><img src={Twitter} alt='Twitter' /> NDLibraries</Link></li>
                <li><Link to='https://www.facebook.com/NDLibraries/' title='Hesburgh Libraries Facebook' target='_blank' rel='noopener'><img src={Facebook} alt='Facebook' /> NDLibraries</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
