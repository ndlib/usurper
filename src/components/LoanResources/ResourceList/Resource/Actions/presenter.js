import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../../../../shared/Configuration'
import Link from '../../../../Link'

const illViewForm = '67'
const illWebForm = '75'

const IllWeb = (item) => {
  if (!item.transactionNumber) {
    return null
  }

  if (item.status === 'Delivered to Web') {
    return (
      <Link
        to={Config.illiadBaseURL.replace('<<form>>', illWebForm).replace('<<value>>', item.transactionNumber)}
        className='button'
      >
        View On Web
      </Link>
    )
  }
  return null
}

const IllView = (item) => {
  if (!item.transactionNumber) {
    return null
  }

  return (
    <Link
      to={Config.illiadBaseURL.replace('<<form>>', illViewForm).replace('<<value>>', item.transactionNumber)}
      className='button'
    >
      View in ILL
    </Link>
  )
}

const AlephRenew = (item, renewal, onRenewClick) => {
  if (item.status === 'On Loan') {
    let message
    if (renewal && item.barcode === renewal.barcode) {
      if (renewal.statusText) {
        message = renewal.statusText
      } else if (renewal.renewStatus === 304) {
        message = 'Too early to renew, try again closer to due date.'
      } else if (renewal.renewStatus === 200) {
        message = 'Renew Successful'
      }
    }

    if (message) {
      return (<span>{message}</span>)
    } else {
      return (<button onClick={onRenewClick}>Renew</button>)
    }
  } else {
    return null
  }
}

export const hasActions = (item) => {
  return ((AlephRenew(item, null, (e) => {}) !== null) || (IllWeb(item) !== null) || (IllView(item) !== null))
}

const Actions = (props) => {
  return (
    <div>
      { AlephRenew(props.item, props.renewal, props.onRenewClick) }
      { IllWeb(props.item) }
      { IllView(props.item) }
    </div>
  )
}

Actions.propTypes = {
  item: PropTypes.object.isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
}

export default Actions
