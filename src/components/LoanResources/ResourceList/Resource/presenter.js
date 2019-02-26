import React from 'react'
import PropTypes from 'prop-types'
import Config from '../../../../shared/Configuration'
import Actions from './Actions'
import { hasActions } from './Actions/presenter'
import nduIcon from '../../../../static/images/icons/ND_monogram.svg'
import hccIcon from '../../../../static/images/icons/HCC.svg'
import illIcon from '../../../../static/images/icons/ILL.svg'

const Card = (className, prefix, data, label) => {
  if (data) {
    if (typeof data === 'function') {
      data = data()
    }
    return (<div className={className} aria-label={label}>{prefix}{data}</div>)
  }
  return <div className={className} />
}

const actionsButton = (item, toggleHidden, includeDelete) => {
  if (hasActions(item, includeDelete)) {
    return (
      <div className='actions-button'>
        <span onClick={toggleHidden} title='More Actions'>⁝</span>
      </div>
    )
  }
}

const icon = (type) => {
  let image = nduIcon
  let desc = type
  switch (type.toUpperCase()) {
    case 'HCC':
      image = hccIcon
      desc = 'Holy Cross College'
      break
    case 'ILL':
      image = illIcon
      desc = 'Interlibrary Loan'
      break
    case 'NDU':
    default:
      image = nduIcon
      desc = 'University of Notre Dame'
  }
  return (
    <span style={{ display: 'inline-block', cursor: 'default' }}>
      <img src={image} alt={desc} title={desc} height='24px' width='24px' />
    </span>
  )
}

const getTitle = (record) => {
  let link = ''
  let docNumber = (record.itemNumber || record.docNumber)
  if (record.from === 'ILL') {
    link = Config.illiadBaseURL.replace('<<form>>', 67).replace('<<value>>', record.id)
  } else if (docNumber) {
    link = `${Config.onesearchBaseURL}/NDU:malc_blended:ndu_aleph${docNumber}`
  } else {
    return <div className='card-title'>{record.title}</div>
  }

  return (
    <div className='card-title'>
      <a href={link} target='_blank' rel='noopener noreferrer'>{record.title}</a>
    </div>
  )
}

const coinsObject = (record) => {
  let isBook = record.documentType === 'BOOK'
  let docNumber = (record.itemNumber || record.docNumber)
  let parts = [
    { key: 'url_ver', value: 'Z39.88-2004' },
    { key: 'url_ctx_fmt', value: 'info:ofi/fmt:kev:mtx:ctx' },
    { key: 'ctx_ver', value: 'Z39.88-2004' },
    { key: 'ctx_enc', value: 'info:ofi/enc:UTF-8' },
    { key: 'rfr_id', value: 'info:sid/library.nd.edu' },
    { key: 'rft_id', value: 'info:ofi/nam:http:onesearch.library.nd.edu/NDU:malc_blended:ndu_aleph' + docNumber },
    { key: 'rft_id', value: record.isbn ? 'info:ofi/nam:urn:ISBN:' + record.isbn : null },
    { key: 'rft_id', value: record.issn ? 'info:ofi/nam:urn:ISSN:' + record.issn : null },
    { key: 'rft_val_fmt', value: 'info:ofi/fmt:kev:mtx:' + (isBook ? 'book' : 'journal') },
    { key: 'rft.btitle', value: isBook ? record.title : null },
    { key: 'rft.atitle', value: !isBook ? record.title : null },
    { key: 'rft.jtitle', value: !isBook ? record.journalTitle : null },
    { key: 'rft.au', value: record.author },
    { key: 'rft.date', value: record.publicationDate },
    { key: 'rft.edition', value: isBook ? record.edition : null },
    { key: 'rft.isbn', value: record.isbn },
    { key: 'rft.issn', value: record.issn },
    { key: 'rft.pub', value: isBook ? record.published : null },
    { key: 'rft.volume', value: !isBook ? record.volume : null },
  ]
  // Format a big string of key=value&key2=value2... etc. Excludes any part with a falsy value.
  let title = parts.filter(e => e.value).map(e => e.value ? e.key + '=' + encodeURIComponent(e.value) : null).join('&')

  return (
    <span className='Z3988' title={title} />
  )
}

const Resource = (props) => {
  const itemFrom = props.item.from || 'NDU'
  const titleSection = getTitle(props.item)
  return (
    <div className={`card-item${props.historical ? ' circ-hist' : ''}`} aria-label={props.item.title}>
      <div className='card-header'>
        {titleSection}
        <div
          className='card-subtitle'
          aria-label={'Published: ' + props.item.published}
        >
          {props.item.published}
        </div>
        {coinsObject(props.item)}
      </div>
      { Card('card-author', '', props.item.author, 'Author: ' + props.item.author) }
      { !props.borrowed && Card('card-status', '', props.item.status, 'Status: ' + props.item.status) }
      { props.historical && Card('card-checked-out', '', props.item.loanDate, 'Checked Out: ' + props.item.loanDate) }
      { props.borrowed && Card('card-due', '', props.item.dueDate, 'Due: ' + props.item.dueDate) }
      { props.historical && (
        Card(
          'card-return',
          '',
          itemFrom === 'ILL' ? 'Not Available' : props.item.returnDate,
          'Returned: ' + props.item.returnDate
        )
      )}
      { /* Card('card-pickup', 'Pickup Location: ', props.item.pickupLocation) */ }
      { Card('card-from', '', icon(itemFrom), itemFrom) }
      { actionsButton(props.item, props.toggleHidden, props.deleteFromHistory) }
      <div className={'actions' + (props.hidden ? '-hidden' : '')}>
        <Actions
          item={props.item}
          alephId={props.alephId}
          renewal={props.renewal}
          borrowed={props.borrowed}
          canRenew={props.canRenew}
          historical={props.historical}
          includeDelete={props.deleteFromHistory}
        />
      </div>
    </div>
  )
}

Resource.propTypes = {
  item: PropTypes.object.isRequired,
  renewal: PropTypes.object,
  canRenew: PropTypes.bool,
  toggleHidden: PropTypes.func,
  alephId: PropTypes.string,
  borrowed: PropTypes.bool,
  deleteFromHistory: PropTypes.bool,
  historical: PropTypes.bool,
  hidden: PropTypes.bool,
}

export default Resource
