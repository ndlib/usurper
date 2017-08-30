'use strict'
import React from 'react'
import PropTypes from 'prop-types'

const SettingsUpdateStatus = (props) => {
  return (
    <div className='updateStatus'>
      {
        props.status === 0 && (
          <div className='sk-three-bounce'>
            <div className='sk-child sk-bounce1' />
            <div className='sk-child sk-bounce2' />
            <div className='sk-child sk-bounce3' />
          </div>
        )
      }
      {
        props.status > 0 && (
          <div className='success'>
            Pickup Location is Synced
          </div>
        )
      }
      {
        props.status < 0 && (
          <div className='failure'>
            Pickup Location Failed to Update
          </div>
        )
      }
    </div>
  )
}

SettingsUpdateStatus.propTypes = {
  status: PropTypes.number,
}

export default SettingsUpdateStatus