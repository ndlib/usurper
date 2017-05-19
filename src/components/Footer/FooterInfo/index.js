import React from 'react'

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
              <a href='/page/hours/' className='hours'>Hours</a>
            </div>
          </div>
          <div className='col-xs-12 col-md-4'>
            <div className='box right'>
              <img src='/images/logo.png' className='flogo' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterInfo
