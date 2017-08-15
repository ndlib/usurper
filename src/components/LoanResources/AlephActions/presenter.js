import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../../shared/Configuration'
import Link from '../../Link'

const AlephActions = (props) => {
  if (props.item.transactionNumber) {
    return null
  }

  let renew
  if (props.item.status === 'On Loan') {
    let message
    if (props.renewal && props.item.barcode === props.renewal.barcode) {
      if (props.renewal.statusText) {
        message = props.renewal.statusText
      } else if (props.renewal.renewStatus === 304) {
        message = 'Too early to renew, try again closer to due date.'
      }
    }

    if (message) {
      renew = <span>{message}</span>
    } else {
      renew = <button onClick={props.onRenewClick}>Renew</button>
    }
  }

  return (
    <div className={props.item.title + 'alephActions'}>
      {renew}
    </div>
  )
}

AlephActions.propTypes = {
  item: PropTypes.object.isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
}

export default AlephActions
