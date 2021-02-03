import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import * as statuses from 'constants/APIStatuses'

const UpdateStatus = (props) => {
  // Only show message after update is a "complete" status (and show is true)
  if (!props.show || ![statuses.SUCCESS, statuses.ERROR, statuses.UNAUTHORIZED].includes(props.status)) {
    return null
  }

  let messageClass
  let defaultText
  if (props.status === statuses.SUCCESS) {
    messageClass = 'success'
    defaultText = 'Update successful.'
  } else if (props.status === statuses.UNAUTHORIZED) {
    messageClass = 'failure'
    defaultText = 'Unauthorized. Please ensure you are logged in.'
  } else {
    messageClass = 'failure'
    defaultText = 'Update failed.'
  }

  return (
    <div className={'updateStatus ' + typy(props.className).safeString}>
      <div className={messageClass}>{props.text || defaultText}</div>
    </div>
  )
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
