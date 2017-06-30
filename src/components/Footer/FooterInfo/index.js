import React from 'react'
import Logo from '../images/logo.png'
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
              <p>221 Hesburgh Library, Notre Dame, IN 46556 </p>
              <p>Phone (574) 631-6679</p>
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
