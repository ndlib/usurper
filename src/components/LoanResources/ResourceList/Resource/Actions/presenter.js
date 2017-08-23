import React from 'react'
import PropTypes from 'prop-types'

import Link from '../../../../Link'
import * as Statuses from '../../../../../constants/APIStatuses'

const IllWeb = (item, url) => {
  if (!item.transactionNumber) {
    return null
  }

  if (item.status === 'Delivered to Web') {
    return (
      <Link to={url} className='button' >
        View On Web
      </Link>
    )
  }
  return null
}

const IllView = (item, url) => {
  if (!item.transactionNumber) {
    return null
  }

  return (
    <Link to={url} className='button'>
      View in ILL
    </Link>
  )
}

const AlephRenew = (item, renewal, onRenewClick, alephMessage) => {
  if (item.status === 'On Loan') {
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
    }

    if (alephMessage) {
      return (<span className='status'>{alephMessage}</span>)
    } else {
      return (<button onClick={onRenewClick}>Renew</button>)
    }
  } else {
    return null
  }
}

export const hasActions = (item) => {
  return (
    (AlephRenew(item, null, (e) => {}, null) !== null) ||
    (IllWeb(item, null) !== null) ||
    (IllView(item, null) !== null)
  )
}

const Actions = (props) => {
  return (
    <div>
      { AlephRenew(props.item, props.renewal, props.onRenewClick, props.alephMessage) }
      { IllWeb(props.item, props.illWebUrl) }
      { IllView(props.item, props.illViewUrl) }
    </div>
  )
}

Actions.propTypes = {
  item: PropTypes.object.isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
  alephMessage: PropTypes.string,
  illWebUrl: PropTypes.string,
  illViewUrl: PropTypes.string,
}

export default Actions
