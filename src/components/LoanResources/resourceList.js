import React from 'react'
import PropTypes from 'prop-types'

import Link from '../Link'
import IlliadActions from './illiadActions'

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
              <div className='card-published'>{'Published: ' + item.published}</div>
              <div className='card-status'>{'Status: ' + (item.transactionStatus ? item.transactionStatus : item.status)}</div>
              <div className='card-due'>{ 'Due Date: ' + item.dueDate }</div>
              <div className={item.title + 'actions'}>
                <button><Link>Renew</Link></button>
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
