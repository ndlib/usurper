import React from 'react'
import Logo from '../images/library.logo.png'
import ChatImage from '../images/chat.png'
import Link from '../../Link'
import ChatModal from './ChatModal'

const FooterInfo = () => {
  return (
    <section id='footer-info' role='contentinfo' aria-label='Hesburgh Libraries'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xs-12 col-md-4'>
            <div className='box'>
              <p>Copyright © 2017 University of Notre Dame</p>
              <p><Link to='https://www.google.com/maps/place/Theodore+M.+Hesburgh+Library/@41.7023619,-86.2363832,17z/data=!3m1!4b1!4m5!3m4!1s0x8816d29f1af60a29:0x87f74f541c574744!8m2!3d41.7023579!4d-86.2341945'>221 Hesburgh Library, Notre Dame, IN 46556 </Link></p>
              <p>Phone <a href='tel:5746316679'>(574) 631-6679</a></p>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='box center' />
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='box right'>
              <img src={Logo} className='flogo' alt='Hesburgh Library Logo' />
            </div>
          </div>
        </div>
      </div>
      <ChatModal />
    </section>
  )
}

export default FooterInfo
