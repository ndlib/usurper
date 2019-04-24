import React from 'react'
import PropTypes from 'prop-types'
import InlineLoading from 'components/Messages/InlineLoading'

const SettingsUpdateStatus = (props) => {
  if (props.status === 0) {
    return <InlineLoading title='' style={{ margin: '10px auto' }} />
  } else if (props.show || typeof props.show === 'undefined') { // Default to true
    return (
      <div className='updateStatus'>
        {
          props.status > 0 && (
            <div className='success'>
              Pickup Location Saved
            </div>
          )
        }
        {
          props.status === -1 && (
            <div className='failure'>
              Pickup Location Failed to Update
            </div>
          )
        }
      </div>
    )
  } else {
    return (null)
  }
}

SettingsUpdateStatus.propTypes = {
  status: PropTypes.number,
  show: PropTypes.bool,
}

export default SettingsUpdateStatus
