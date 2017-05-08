'use strict'
import React, { Component } from 'react'
import style from '../../static/css/global.css'

class FeedbackButton extends Component {
  render () {
    return (
      <div className='feedback-notice-me'>
        <a href='https://docs.google.com/a/nd.edu/forms/d/e/1FAIpQLSdL4MnInHvXcQke9dJQ1Idkv2O23u9dBV_9ky40WDOV77B_MA/viewform?c=0&amp;w=1' target='_blank'>SUBMIT FEEDBACK<div className='tool-tip'>Submit feedback for the Alpha preview site.</div></a>
      </div>
    )
  }
}

export default FeedbackButton
