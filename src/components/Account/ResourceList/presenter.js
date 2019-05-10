import React from 'react'
import PropTypes from 'prop-types'

import Resource from './Resource'
import ListActions from './ListActions'
import ColumnHeaders from './ColumnHeaders'
import InlineLoading from 'components/Messages/InlineLoading'
import FilterBox from 'components/Interactive/FilterBox'

import * as helper from 'constants/HelperFunctions'
import typeConstants from './constants'

const ResourceList = (props) => {
  const config = typeConstants[props.listType]
  return props.loading
    ? <InlineLoading title={`Loading ${config.displayName} Items`} />
    : (
      <section aria-label={config.displayName}>
        <h3>{ `${props.count} Item${helper.pluralize(props.count)} ${config.headerTextSuffix}` }</h3>
        { props.count === 0 ? (
          <div>{config.emptyText}</div>
        ) : (
          <React.Fragment>
            <ListActions list={props.list} listType={props.listType} />
            <FilterBox title='Filter Items:' value={props.filterValue} onChange={props.filterChange} />
            <ColumnHeaders {...props} />
            <div className='screenReaderText' aria-live='assertive'>{ props.assistText }</div>
            <section aria-label={config.displayName + ' item list'} id={config.displayName}>
              { props.list.map((item) => {
                return <Resource key={item.id} item={item} listType={props.listType} />
              })}
            </section>
          </React.Fragment>
        )}
      </section>
    )
}

ResourceList.propTypes = {
  list: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  filterValue: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  assistText: PropTypes.string.isRequired,
  listType: PropTypes.string.isRequired,
}

export default ResourceList
