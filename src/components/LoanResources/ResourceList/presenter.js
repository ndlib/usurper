import React from 'react'
import PropTypes from 'prop-types'
import IlliadActions from '../illiadActions'
import AlephActions from '../AlephActions'

const Card = (className, prefix, data) => {
  if (data) {
    return (<div className={className}>{prefix + data}</div>)
  }
  return <div className={className} />
}

const SortClass = (sortOn, sortValue, sortClass) => {
  return ' ' + (sortOn === sortValue ? sortClass : 'sort-none')
}

const dueDate = (item, renewal) => {
  if (renewal && renewal.renewStatus === 200 && item.barcode === renewal.barcode) {
    return renewal.dueDate
  }
  return item.dueDate
}

const ResourceList = (props) => {
  if (!props.list) {
    return (
      <div>{props.emptyText}</div>
    )
  }

  return (
    <div>
      <div className='filter'>
        Filter items: <input type='text' value={props.filterValue} onChange={props.filterChange} />
      </div>
      <div className='card-item'>
        <div
          className={'card-title' + SortClass(props.sortOn, 'title', props.sortClass)}
          onClick={(e) => props.sortChange(e, 'title')}
        >
          Title
        </div>
        <div
          className={'card-author' + SortClass(props.sortOn, 'author', props.sortClass)}
          onClick={(e) => props.sortChange(e, 'author')}
        >
          Author
        </div>
        {
          props.showStatus && (
            <div
              className={'card-status' + SortClass(props.sortOn, 'status', props.sortClass)}
              onClick={(e) => props.sortChange(e, 'status')}
            >
              Status
            </div>
          )
        }
        <div
          className={'due-date' + SortClass(props.sortOn, 'dueDate', props.sortClass)}
          onClick={(e) => props.sortChange(e, 'dueDate')}
        >
          Due Date
        </div>
      </div>
      {
        props.list.map((item, index) => {
          return (
            <div className='card-item' key={index + 'Card'}>
              <div className='card-header'>
                <div className='card-title'>{item.title}</div>
                <div className='card-subtitle'>{item.published}</div>
              </div>
              { Card('card-author', '', item.author) }
              { props.showStatus && Card('card-status', '', item.status) }
              { Card('card-due', '', dueDate(item, props.renewal)) }
              { Card('card-pickup', 'Pickup Location: ', item.pickupLocation) }
              <div className={'actions'}>
                <IlliadActions item={item} />
                <AlephActions item={item} alephId={props.alephId} renewal={props.renewal} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

ResourceList.propTypes = {
  list: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  showStatus: PropTypes.bool,
}

export default ResourceList
