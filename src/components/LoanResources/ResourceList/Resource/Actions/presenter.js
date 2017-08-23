import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../../../../shared/Configuration'
import Link from '../../../../Link'
import * as Statuses from '../../../../../constants/APIStatuses'

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
    if (renewal && renewal[item.barcode]) {
      if (renewal[item.barcode].state === Statuses.FETCHING) {
        return (
          <div className='sk-three-bounce'>
            <div className='sk-child sk-bounce1' />
            <div className='sk-child sk-bounce2' />
            <div className='sk-child sk-bounce3' />
          </div>
        )
      }

      let itemRenew = renewal[item.barcode].data
      if (itemRenew.statusText) {
        message = itemRenew.statusText
      } else if (itemRenew.renewStatus === 304) {
        message = 'Too early to renew. Try again closer to due date.'
      } else if (itemRenew.renewStatus === 200) {
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
