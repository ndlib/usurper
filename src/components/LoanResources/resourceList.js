import React from 'react'
import PropTypes from 'prop-types'

import Link from '../Link'
import IlliadActions from './illiadActions'

const Card = (className, prefix, data) => {
  if (data) {
    return (<div className={className}>{prefix + ': ' + data}</div>)
  }
  return null
}

const ResourceList = ({ list, emptyText }) => {
  if (!list || list.length === 0) {
    return (
      <div>{emptyText}</div>
    )
  }

  return (
    <div>
      {
        list.map((item) => {
          return (
            <div className='card-item' key={item.title + 'Card'}>
              <div className='card-header'>
                <div className='card-title'>{item.title}</div>
                <div className='card-subtitle'>{item.author}</div>
              </div>
              { Card('card-published', 'Published', item.published) }
              { Card('card-status', 'Status', item.status) }
              { Card('card-due', 'Due Date', item.dueDate) }
              { Card('card-pickup', 'Pickup Location', item.pickupLocation) }
              <div className={item.title + ' actions'}>
                <IlliadActions item={item} />
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
}

export default ResourceList
