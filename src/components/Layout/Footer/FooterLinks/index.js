import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'
import Link from 'components/Interactive/Link'
import ServiceNowLink from 'components/Interactive/ServiceNowLink'

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
                <li><ServiceNowLink>Report A Problem</ServiceNowLink></li>
                <li><Link to='https://sites.google.com/nd.edu/hlemployeeportal/home'>Employee Portal</Link></li>
                <li>
                  <Link to='https://libguides.library.nd.edu/government-information' label='Federal Depository Library'>
                    <img
                      src='/icons/fdlp-emblem-color.png'
                      className='gov'
                      alt='Logo of Federal Depository Library Project'
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='col-xs-4'>
            <div className='box right'>
              <ul>
                <li><Link
                  to='http://twitter.com/ndlibraries'
                  title='Hesburgh Libraries Twitter'
                  target='_blank'
                  rel='noopener'>
                  <img src={Twitter} alt='Twitter' /> NDLibraries</Link>
                </li>
                <li><Link
                  to='https://www.facebook.com/NDLibraries/'
                  title='Hesburgh Libraries Facebook'
                  target='_blank'
                  rel='noopener'>
                  <img src={Facebook} alt='Facebook' /> NDLibraries</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
