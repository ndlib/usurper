import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import ExportButton from '../../ListActions/ExportButton'
import DeleteButton from '../../ListActions/DeleteButton'
import Link from 'components/Interactive/Link'
import * as statuses from 'constants/APIStatuses'
import InlineLoading from 'components/Messages/InlineLoading'

import typeConstants from '../../constants'

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
  if (item.status !== 'On Loan') {
    return null
  }

  if (typy(renewal, `[${item.barcode}].state`).safeString === statuses.FETCHING) {
    return <InlineLoading title='' />
  }

  if (renewMessage) {
    const messageClass = 'status' + (renewal[item.barcode].data.renewStatus === 200 ? ' success' : ' failure')
    return (<span className={messageClass}>{renewMessage}</span>)
  } else {
    return (<button onClick={onRenewClick} disabled={!canRenew}>Renew</button>)
  }
}

export const hasActions = (item, listType) => {
  const config = typeConstants[listType]
  return (
    (AlephRenew(item, null, () => {}, null) !== null) ||
    (IllWeb(item, null) !== null) ||
    (IllView(item, null) !== null) ||
    config.exportButton ||
    config.deleteButton
  )
}

const Actions = (props) => {
  const config = typeConstants[props.listType]
  return (
    <div>
      { config.renewButton && (
        AlephRenew(props.item, props.canRenew, props.renewal, props.onRenewClick, props.renewMessage)
      )}
      { ILLRenew(props.item, props.renewMessage) }
      { IllWeb(props.item, props.illWebUrl) }
      { IllView(props.item, props.illViewUrl) }
      { config.exportButton && (
        <ExportButton items={[props.item]} />
      )}
      { config.deleteButton && (
        <DeleteButton items={[props.item]} />
      )}
    </div>
  )
}

Actions.propTypes = {
  item: PropTypes.shape({
    transactionNumber: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
  onRenewClick: PropTypes.func.isRequired,
  renewal: PropTypes.object,
  renewMessage: PropTypes.string,
  canRenew: PropTypes.bool,
  illWebUrl: PropTypes.string,
  illViewUrl: PropTypes.string,
  listType: PropTypes.string.isRequired,
}

export default Actions
