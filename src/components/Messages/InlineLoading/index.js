import { connect } from 'react-redux'
import React from 'react'

const InlineLoading = ({ message = '' }) => (
  <div className={'Loading inline'}>
    <div>Loading</div>
    <div className='sk-three-bounce'>
      <div className='sk-child sk-bounce1' />
      <div className='sk-child sk-bounce2' />
      <div className='sk-child sk-bounce3' />
    </div>
    <div>{ message }</div>
  </div>
)

export default InlineLoading
