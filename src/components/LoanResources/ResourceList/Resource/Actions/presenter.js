import React from 'react'
import PropTypes from 'prop-types'
import ExportButton from '../../ExportButton'
import DeleteButton from '../../DeleteButton'
import Link from '../../../../Link'
import * as Statuses from '../../../../../constants/APIStatuses'
import InlineLoading from '../../../../Messages/InlineLoading'

const ILLRenew = (item, message) => {
  if (message && item.transactionNumber) {
    return <span className='failure'>{message}</span>
  }
}

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

const AlephRenew = (item, canRenew, renewal, onRenewClick, renewMessage) => {
  if (item.status === 'On Loan') {
    if (renewal && renewal[item.barcode]) {
      if (renewal[item.barcode].state === Statuses.FETCHING) {
        return <InlineLoading title='' />
      }
    }

    if (renewMessage) {
      let messageClass = 'status' + renewal[item.barcode].data.renewStatus === 200 ? ' success' : ' failure'
      return (<span className={messageClass}>{renewMessage}</span>)
    } else {
      return (<button onClick={onRenewClick} disabled={!canRenew}>Renew</button>)
    }
  } else {
    return null
  }
}

const ExportItem = (item, historical) => {
  if (!historical) {
    return null
  } else {
    return (<ExportButton items={[item]} />)
  }
}

const DeleteItem = (item, includeDelete) => {
  if (!includeDelete) {
    return ''
  }

  return <DeleteButton items={[item]} />
}

export const hasActions = (item, includeDelete) => {
  return (
    (AlephRenew(item, null, () => {}, null) !== null) ||
    (IllWeb(item, null) !== null) ||
    (IllView(item, null) !== null) ||
    (ExportItem(item) !== null) ||
    (DeleteItem(item, includeDelete) !== null)
  )
}

const Actions = (props) => {
  return (
    <div>
      { AlephRenew(props.item, props.canRenew, props.renewal, props.onRenewClick, props.renewMessage) }
      { ILLRenew(props.item, props.renewMessage) }
      { IllWeb(props.item, props.illWebUrl) }
      { IllView(props.item, props.illViewUrl) }
      { ExportItem(props.item, props.historical)}
      { DeleteItem(props.item, props.includeDelete)}
    </div>
  )
}

Actions.propTypes = {
  item: PropTypes.object.isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
  renewMessage: PropTypes.string,
  canRenew: PropTypes.bool,
  illWebUrl: PropTypes.string,
  illViewUrl: PropTypes.string,
  historical: PropTypes.bool,
  includeDelete: PropTypes.bool,
}

export default Actions
