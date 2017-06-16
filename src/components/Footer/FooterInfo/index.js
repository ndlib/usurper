import React from 'react'
import Logo from '../images/logo.png'
import Chat from '../images/chat.png'
import Link from '../../Link'

const FooterInfo = () => {
  return (
    <div id='footer-info'>
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
            <div className='box center'>
              <Link to='/hours/' className='hours'>Hours</Link>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='box right'>
              <img src={Logo} className='flogo' />
            </div>
          </div>
        </div>
      </div>
      <div id='chat'>
        <Link to='/chat' className='chat-button'><img src={Chat} /> Chat with us</Link>

      </div>
    </div>
  )
}

export default FooterInfo
