import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'
import Loading from '../../Messages/InlineLoading'
import FilterBox from '../../FilterBox'
import ExportButton from './ExportButton'
import DeleteButton from './DeleteButton'

const ResourceList = (props) => {
  return (
    <section aria-label={props.listType}>
      { props.borrowed && !props.historical && <button className='renew' onClick={props.renewAll} aria-label='Renew all renewable items'>Renew All</button> }
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
        { props.borrowed && !props.historical && (
          <a
            className={props.sortClass('dueDate')}
            onClick={(e) => props.sortClick(e, 'dueDate')}
            aria-label={'Sort By Due Date ' + props.assistSortDirection('dueDate')}
            aria-controls={props.listType}
          >
            Due Date
          </a>
        )}

        { props.historical && (
          <a
            className={props.sortClass('checkedOut')}
            onClick={(e) => props.sortClick(e, 'checkedOut')}
            aria-label={'Sort By Checked Out Date ' + props.assistSortDirection('checkedOut')}
            aria-controls={props.listType}
          >
            Checked Out
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
                alephId={props.alephId}
                borrowed={props.borrowed}
                deleteFromHistory={props.deleteFromHistory}
                historical={props.historical}
                key={index}
              />
            )
          })
        }
      </section>
      { props.loadingMore && <Loading message='Loading More Items' /> }
      { props.historical && <div className='pull-right-bottom'>
        <DeleteButton
          action={() => { console.log('delete') }}
          items={props.list}
        />
        <ExportButton />
      </div>}
    </section>
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
  listType: PropTypes.string.isRequired,
  assistText: PropTypes.string.isRequired,
  deleteFromHistory: PropTypes.bool,
  historical: PropTypes.bool,
}

export default ResourceList
