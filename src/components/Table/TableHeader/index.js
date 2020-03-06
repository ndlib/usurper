import React from 'react'
import PropTypes from 'prop-types'

function TableHeader (props) {
  return (
    <thead>
      <tr>
        {props.columns.map(column => (
          <th scope='col' role='heading' key={column.key || column.path}>{column.label}</th>))}
      </tr>
    </thead>
  )
}

export default TableHeader

TableHeader.propTypes = {
  columns: PropTypes.array.isRequired,
}
