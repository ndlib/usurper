'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const AskMenu = (props) => {
  if (props.open) {
    return (
      <div className='menu-drawer'>
        <div className='container-fluid row'>
          <ul className='child'>
            <li><a href='/chat/'>Chat with a Librarian</a></li>
            <li><a href='/contact-quick-guide/'>Contact Quick Guide</a></li>
            <li><a href='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1'>Report a problem</a></li>
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
