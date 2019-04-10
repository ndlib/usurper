import React from 'react'
import PropTypes from 'prop-types'
import Resource from './Resource'
import Loading from '../../Messages/InlineLoading'
import FilterBox from '../../FilterBox'
import ExportButton from './ExportButton'
import DeleteButton from './DeleteButton'

const ResourceList = (props) => {
  const renewal = props.renewal
  const alephId = props.alephId
  const deleteFromHistory = props.deleteFromHistory
  const sortClick = props.sortClick
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
          className={props.sortClass('title')}
          onClick={(e) => sortClick(e, 'title')}
          aria-label={'Sort By Title ' + props.assistSortDirection('title')}
          aria-controls={props.listType}
        >
          Title
        </button>
        <button
          className={props.sortClass('author')}
          onClick={(e) => sortClick(e, 'author')}
          aria-label={'Sort By Author ' + props.assistSortDirection('author')}
          aria-controls={props.listType}
        >
          Author
        </button>
        { !props.borrowed && (
          <button
            className={props.sortClass('status')}
            onClick={(e) => props.sortClick(e, 'status')}
            aria-label={'Sort By Status ' + props.assistSortDirection('status')}
            aria-controls={props.listType}
          >
            Status
          </button>
        )}
        { props.historical && (
          <button
            className={props.sortClass('loanDate')}
            onClick={(e) => sortClick(e, 'loanDate')}
            aria-label={'Sort By Checked Out Date ' + props.assistSortDirection('loanDate')}
            aria-controls={props.listType}
          >
            Checked Out
          </button>
        )}
        { props.borrowed && (
          <button
            className={props.sortClass('dueDate')}
            onClick={(e) => sortClick(e, 'dueDate')}
            aria-label={'Sort By Due Date ' + props.assistSortDirection('dueDate')}
            aria-controls={props.listType}
          >
            Due Date
          </button>
        )}
        { props.historical && (
          <button
            className={props.sortClass('returnDate')}
            onClick={(e) => sortClick(e, 'returnDate')}
            aria-label={'Sort By Return Date ' + props.assistSortDirection('returnDate')}
            aria-controls={props.listType}
          >
            Returned
          </button>
        )}
        <button
          className={props.sortClass('from')}
          onClick={(e) => sortClick(e, 'from')}
          aria-label={'Sort By From ' + props.assistSortDirection('from')}
          aria-controls={props.listType}
        >
          From
        </button>
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
