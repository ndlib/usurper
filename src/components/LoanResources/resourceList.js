import React from 'react'
import PropTypes from 'prop-types'

import Config from '../../shared/Configuration'
import Link from '../Link'

// NOTE: all of this will be removed after the api is updated
const formatDueDate = (date) => {
  if (!date) {
    return ''
  }
  // '20170531'
  var year = date.substring(0, 4)
  var month = date.substring(4, 6)
  var day = date.substring(6, 8)
  return year + '-' + month + '-' + day
}

const getAuthor = (item) => {
  if (item.author) {
    return item.author
  } else if (item.articleAuthor) {
    return item.articleAuthor
  }
  return null
}

const getPublished = (item) => {
  if (item.published) {
    return item.published
  } else if (item.publishedDate) {
    return item.publishedDate
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
                <div className='card-subtitle'>{getAuthor(item)}</div>
              </div>
              <div className='card-published'>{'Published: ' + getPublished(item)}</div>
              <div className='card-status'>{'Status: ' + (item.transactionStatus ? item.transactionStatus : item.status)}</div>
              <div className='card-due'>{'Due Date: ' + formatDueDate(item.dueDate)}</div>
              <div className={item.title + 'actions'}>
                <button><Link>Renew</Link></button>
                <button><Link to={Config.illiadBaseURL + item.transactionNumber} hideIfNull>View in ILL</Link></button>
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
