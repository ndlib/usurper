'use strict'
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'

const AskMenu = (props) => {
  if (props.open) {
    return (
      <div className={props.open ? 'menu-drawer visible' : 'menu-drawer'}>
        <div className='container-fluid row'>
          <ul className='child'>
            <li><Link to='/chat/'>Chat with a Librarian</Link></li>
            <li><Link to='/contact-quick-guide/'>Contact Quick Guide</Link></li>
            <li><Link to='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>Report a problem</Link></li>
          </ul>
        </div>
      </div>
    )
  }
  return null
}
AskMenu.propTypes = {
  open: PropTypes.bool,
}

AskMenu.defaultProps = {
  open: false,
}
export default AskMenu
