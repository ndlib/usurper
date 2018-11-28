import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'
import Loading from '../../Messages/InlineLoading'
import FilterBox from '../../FilterBox'

const ResourceList = (props) => {
  return (
    <section aria-label={props.listType}>
      { props.borrowed && <button className='renew' onClick={props.renewAll} aria-label='Renew all renewable items' disabled={!props.canRenew}>Renew All</button> }
      <FilterBox
        title='Filter Items:'
        value={props.filterValue}
        onChange={props.filterChange}
      />
      <div className='card-item'>
        <a
          className={props.sortClass('title')}
          onClick={(e) => props.sortClick(e, 'title')}
          aria-label={'Sort By Title ' + props.assistSortDirection('title')}
          aria-controls={props.listType}
        >
          Title
        </a>
        <a
          className={props.sortClass('author')}
          onClick={(e) => props.sortClick(e, 'author')}
          aria-label={'Sort By Author ' + props.assistSortDirection('author')}
          aria-controls={props.listType}
        >
          Author
        </a>
        { !props.borrowed && (
          <a
            className={props.sortClass('status')}
            onClick={(e) => props.sortClick(e, 'status')}
            aria-label={'Sort By Status ' + props.assistSortDirection('status')}
            aria-controls={props.listType}
          >
            Status
          </a>
        )}
        { props.borrowed && (
          <a
            className={props.sortClass('dueDate')}
            onClick={(e) => props.sortClick(e, 'dueDate')}
            aria-label={'Sort By Due Date ' + props.assistSortDirection('dueDate')}
            aria-controls={props.listType}
          >
            Due Date
          </a>
        )}

      </div>
      <div className='screenReaderText' aria-live='assertive'>
        { props.assistText }
      </div>
      <section
        aria-label={props.listType + ' item list'}
        id={props.listType}
      >
        {
          props.list.map((item, index) => {
            return (
              <Resource
                item={item}
                renewal={props.renewal}
                canRenew={props.canRenew}
                alephId={props.alephId}
                borrowed={props.borrowed}
                key={index}
              />
            )
          })
        }
      </section>
      { props.loadingMore && <Loading message='Loading More Items' /> }
    </section>
  )
}

ResourceList.propTypes = {
  list: PropTypes.array.isRequired,
  borrowed: PropTypes.bool,
  filterValue: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  alephId: PropTypes.string,
  renewal: PropTypes.object,
  renewAll: PropTypes.func,
  canRenew: PropTypes.bool,
  sortClass: PropTypes.func.isRequired,
  sortClick: PropTypes.func.isRequired,
  assistSortDirection: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool,
  listType: PropTypes.string.isRequired,
  assistText: PropTypes.string.isRequired,
}

export default ResourceList
