import React from 'react'
import PropTypes from 'prop-types'

import * as states from 'constants/APIStatuses'

const UpdateStatus = (props) => {
  if (!props.show) {
    return null
  }

  if (props.status === states.SUCCESS) {
    return (
      <div className={'updateStatus ' + (props.className || '')}>
        <div className='success'>
          {props.text || 'Update successful.'}
        </div>
      </div>
    )
  } else if (props.status === states.ERROR) {
    return (
      <div className={'updateStatus ' + (props.className || '')}>
        <div className='failure'>
          {props.text || 'Update failed.'}
        </div>
      </div>
    )
  }

  return null
}

UpdateStatus.propTypes = {
  status: PropTypes.string.isRequired,
  show: PropTypes.bool,
  text: PropTypes.string,
  className: PropTypes.string,
}

UpdateStatus.defaultProps = {
  show: true,
}

export default UpdateStatus
