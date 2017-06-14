import React from 'react'
import Facebook from '../images/facebook.png'
import Twitter from '../images/twitter.png'

const FooterLinks = () => {
  return (
    <div id='footer-links'>
      <div className='container-fluid'>
        <div className='row bottom-xs'>
          <div className='col-xs-6'>
            <div className='box'>
              <ul>
                <li><a href='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>Feedback</a></li>
                <li><a href='http://librarygiving.nd.edu'>Library Giving</a></li>
                <li><a href='/employment/'>Jobs</a></li>
                <li><a href='https://wiki.nd.edu/display/libintranet/Home'>Hesnet</a></li>
              </ul>
            </div>
          </div>

          <div className='col-xs-4 col-xs-offset-2'>
            <div className='box right'>
              <ul><li><a href='http://twitter.com/ndlibraries' target='_blank'><img src={Twitter} /> NDLibraries</a></li>

                <li><a href='https://www.facebook.com/hesburghlibraries/' target='_blank'><img src={Facebook} /> NDLibraries</a></li></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FooterLinks
