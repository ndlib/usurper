import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'

const SortClass = (sortOn, sortValue, sortClass) => {
  return ' ' + (sortOn === sortValue ? sortClass : 'sort-none')
}

const ResourceList = (props) => {
  if (!props.list || props.list.length === 0) {
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
          className={'sort-title' + SortClass(props.sortOn, 'title', props.sortClass)}
          onClick={(e) => props.sortChange(e, 'title')}
        >
          Title
        </div>
        <div
          className={'sort-author' + SortClass(props.sortOn, 'author', props.sortClass)}
          onClick={(e) => props.sortChange(e, 'author')}
        >
          Author
        </div>
        {
          props.showStatus && (
            <div
              className={'sort-status' + SortClass(props.sortOn, 'status', props.sortClass)}
              onClick={(e) => props.sortChange(e, 'status')}
            >
              Status
            </div>
          )
        }
        {
          !props.showStatus && (
            <div
              className={'sort-date' + SortClass(props.sortOn, 'dueDate', props.sortClass)}
              onClick={(e) => props.sortChange(e, 'dueDate')}
            >
              Due Date
            </div>
          )
        }
      </div>
      {
        props.list.map((item, index) => {
          return <Resource item={item} renewal={props.renewal} alephId={props.alephId} showStatus={props.showStatus} key={index} />
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
