import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'
import Loading from '../../Messages/Loading'

const ResourceList = (props) => {
  return (
    <div>
      <div className='filter'>
        Filter items: <input type='text' value={props.filterValue} onChange={props.filterChange} />
        { props.borrowed && <button className='renew' onClick={props.renewAll} aria-label='Renew All'>Renew All</button> }
      </div>
      <div className='card-item'>
        <div className={props.sortClass('title')} onClick={(e) => props.sortClick(e, 'title')} >
          Title
        </div>
        <div className={props.sortClass('author')} onClick={(e) => props.sortClick(e, 'author')} >
          Author
        </div>
        { !props.borrowed && (
          <div className={props.sortClass('status')} onClick={(e) => props.sortClick(e, 'status')} >
            Status
          </div>
        )}
        { props.borrowed && (
          <div className={props.sortClass('dueDate')} onClick={(e) => props.sortClick(e, 'dueDate')} >
            Due Date
          </div>
        )}

      </div>
      { props.loadingMore && <Loading message='Loading more items' /> }
      {
        props.list.map((item, index) => {
          return (
            <Resource
              item={item}
              renewal={props.renewal}
              alephId={props.alephId}
              borrowed={props.borrowed}
              key={index}
            />
          )
        })
      }
    </div>
  )
}

ResourceList.propTypes = {
  list: PropTypes.array.isRequired,
  borrowed: PropTypes.bool,
  filterValue: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  renewAll: PropTypes.func,
  sortClass: PropTypes.func.isRequired,
  sortClick: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
}

export default ResourceList
