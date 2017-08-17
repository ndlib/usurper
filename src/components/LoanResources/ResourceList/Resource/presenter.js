import React from 'react'
import PropTypes from 'prop-types'
import Actions from './Actions'
import { hasActions } from './Actions/presenter'

const Card = (className, prefix, data) => {
  if (data) {
    return (<div className={className}><span>{prefix + data}</span></div>)
  }
  return <div className={className} />
}

const dueDate = (item, renewal) => {
  if (renewal && renewal.renewStatus === 200 && item.barcode === renewal.barcode) {
    return renewal.dueDate
  }
  return item.dueDate
}

const actionsButton = (item, toggleHidden) => {
  if (hasActions(item)) {
    return (
      <div className={'actions-button'}>
        <span onClick={toggleHidden}>☰</span>
      </div>
    )
  }
}

const ResourceList = (props) => {
  return (
    <div className='card-item'>
      <div className='card-header'>
        <div className='card-title'>{props.item.title}</div>
        <div className='card-subtitle'>{props.item.published}</div>
      </div>
      { Card('card-author', '', props.item.author) }
      { props.showStatus && Card('card-status', '', props.item.status) }
      { !props.showStatus && Card('card-due', '', dueDate(props.item, props.renewal)) }
      { Card('card-pickup', 'Pickup Location: ', props.item.pickupLocation) }

      { actionsButton(props.item, props.toggleHidden) }
      <div className={'actions' + (props.hidden ? '-hidden' : '')}>
        <Actions item={props.item} alephId={props.alephId} renewal={props.renewal} />
      </div>
    </div>
  )
}

ResourceList.propTypes = {
  item: PropTypes.object.isRequired,
  renewal: PropTypes.object,
}

export default ResourceList
