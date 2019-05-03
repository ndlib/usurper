import React from 'react'
import PropTypes from 'prop-types'

import ColumnHeader from './ColumnHeader'
import typeConstants from '../constants'

const ColumnHeaders = (props) => {
  return (
    <div className={'card-item' + (props.listType === 'history' ? ' circ-hist' : '')}>
      <ColumnHeader displayName='Title' columnKey='title' {...props} />
      { Object.keys(typeConstants[props.listType].columns).map((columnKey) => {
        const label = typeConstants[props.listType].columns[columnKey]
        return <ColumnHeader key={columnKey} displayName={label} columnKey={columnKey} {...props} />
      })}
    </div>
  )
}

ColumnHeaders.propTypes = {
  listType: PropTypes.string.isRequired,
}

export default ColumnHeaders
