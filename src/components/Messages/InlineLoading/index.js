import React from 'react'
import PropTypes from 'prop-types'

const InlineLoading = ({ message = '', title = 'Loading' }) => (
  <div className={'Loading inline'}>
    <div>{ title }</div>
    <div className='sk-three-bounce'>
      <div className='sk-child sk-bounce1' />
      <div className='sk-child sk-bounce2' />
      <div className='sk-child sk-bounce3' />
    </div>
    <div>{ message }</div>
  </div>
)
InlineLoading.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
}

export default InlineLoading
