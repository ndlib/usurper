import React from 'react'
import PropTypes from 'prop-types'

import Loading from '../Messages/Loading'
import IlliadActions from './illiadActions'
import AlephActions from './AlephActions'

const Card = (className, prefix, data) => {
  if (data) {
    return (<div className={className}>{prefix + ': ' + data}</div>)
  }
  return null
}

const ResourceList = ({ loading, list, emptyText, alephId, renewal }) => {
  if (loading) {
    return <Loading />
  }

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
                <AlephActions item={item} alephId={alephId} renewal={renewal} />
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

ResourceList.propTypes = {
  loading: PropTypes.bool,
  list: PropTypes.array.isRequired,
  emptyText: PropTypes.string.isRequired,
  alephId: PropTypes.string,
  renewal: PropTypes.object,
}

export default ResourceList
