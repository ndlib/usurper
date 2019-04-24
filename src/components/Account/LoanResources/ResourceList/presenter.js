import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'
import Loading from 'components/Messages/InlineLoading'
import FilterBox from 'components/Interactive/FilterBox'
import ExportButton from './ExportButton'
import DeleteButton from './DeleteButton'

const ResourceList = (props) => {
  const { renewal, alephId, deleteFromHistory, sortClick, sortClass, listType, assistSortDirection } = props
  return (
    <section aria-label={props.listType}>
      <div className='item-list-global-actions'>
        { props.borrowed && !props.historical && (
          <button
            className='renew'
            onClick={props.renewAll}
            aria-label='Renew all renewable items'
            disabled={!props.canRenew}
          >Renew All</button>
        )}
        { props.historical && (
          <React.Fragment>
            <ExportButton
              items={props.list}
              key='globalExport'
            />
            <DeleteButton
              items={props.list}
              key='globalDelete'
            />
          </React.Fragment>
        )}
      </div>
      <FilterBox
        title='Filter Items:'
        value={props.filterValue}
        onChange={props.filterChange}
      />
      <div className={`card-item${props.historical ? ' circ-hist' : ''}`}>
        <button
          className={'custom-style ' + sortClass('title')}
          onClick={(e) => sortClick(e, 'title')}
          aria-label={'Sort By Title ' + assistSortDirection('title')}
          aria-controls={listType}
        >
          Title
        </button>
        <button
          className={'custom-style ' + sortClass('author')}
          onClick={(e) => sortClick(e, 'author')}
          aria-label={'Sort By Author ' + assistSortDirection('author')}
          aria-controls={listType}
        >
          Author
        </button>
        { !props.borrowed && (
          <button
            className={'custom-style ' + sortClass('status')}
            onClick={(e) => sortClick(e, 'status')}
            aria-label={'Sort By Status ' + assistSortDirection('status')}
            aria-controls={listType}
          >
            Status
          </button>
        )}
        { props.historical && (
          <button
            className={'custom-style ' + sortClass('loanDate')}
            onClick={(e) => sortClick(e, 'loanDate')}
            aria-label={'Sort By Checked Out Date ' + assistSortDirection('loanDate')}
            aria-controls={listType}
          >
            Checked Out
          </button>
        )}
        { props.borrowed && (
          <button
            className={'custom-style ' + sortClass('dueDate')}
            onClick={(e) => sortClick(e, 'dueDate')}
            aria-label={'Sort By Due Date ' + assistSortDirection('dueDate')}
            aria-controls={listType}
          >
            Due Date
          </button>
        )}
        { props.historical && (
          <button
            className={'custom-style ' + sortClass('returnDate')}
            onClick={(e) => sortClick(e, 'returnDate')}
            aria-label={'Sort By Return Date ' + assistSortDirection('returnDate')}
            aria-controls={listType}
          >
            Returned
          </button>
        )}
        <button
          className={'custom-style ' + sortClass('from')}
          onClick={(e) => sortClick(e, 'from')}
          aria-label={'Sort By From ' + assistSortDirection('from')}
          aria-controls={listType}
        >
          From
        </button>
      </div>
      <div className='screenReaderText' aria-live='assertive'>
        { props.assistText }
      </div>
      <section
        aria-label={listType + ' item list'}
        id={listType}
      >
        {
          props.list.map((item, index) => {
            return (
              <Resource
                item={item}
                renewal={renewal}
                canRenew={props.canRenew}
                alephId={alephId}
                borrowed={props.borrowed}
                deleteFromHistory={deleteFromHistory}
                historical={props.historical}
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
  deleteFromHistory: PropTypes.bool,
  historical: PropTypes.bool,
}

export default ResourceList
