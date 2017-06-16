import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'
import Link from '../../Link'

const FooterLinks = () => {
  return (
    <div id='footer-links'>
      <div className='container-fluid'>
        <div className='row bottom-xs'>
          <div className='col-xs-6'>
            <div className='box'>
              <ul>
                <li><Link to='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>Feedback</Link></li>
                <li><Link to='http://librarygiving.nd.edu'>Library Giving</Link></li>
                <li><Link to='/employment/'>Jobs</Link></li>
                <li><Link to='https://wiki.nd.edu/display/libintranet/Home'>Hesnet</Link></li>
              </ul>
            </div>
          </div>

          <div className='col-xs-4 col-xs-offset-2'>
            <div className='box right'>
              <ul><li><Link to='http://twitter.com/ndlibraries' target='_blank'><img src={Twitter} /> NDLibraries</Link></li>

                <li><Link to='https://www.facebook.com/hesburghlibraries/' target='_blank'><img src={Facebook} /> NDLibraries</Link></li></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
