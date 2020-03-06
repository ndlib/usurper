import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

const TableBody = (props) => {
  return (
    <tbody>
      {props.data.map((item, index) => (
        <tr key={typy(item, 'sys.id').safeString || index}>
          {props.columns.map(column =>
            <td role='cell' key={column.label}>{typy(item, column.path).safeObject}</td>)
          }
        </tr>
      ))}
    </tbody>
  )
}

export default TableBody

TableBody.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}
