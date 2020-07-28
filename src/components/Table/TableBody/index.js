import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import MediaQuery from 'react-responsive'

const TableBody = (props) => {
  return (
    <tbody>
      {props.data.map((item, index) => (
        <tr key={typy(item, 'sys.id').safeString || index}>
          {props.columns.map(column => {
            const value = typy(item, column.path).safeObject
            return (
              <td className={(!value && value !== false && value !== 0) ? 'collapseTableCell' : ''} role='cell' key={column.label}>
                {(column.mobileLabel || column.label) && (
                  <MediaQuery maxWidth={619}>
                    <h3 className={`meetingSpacesHeader`}>{column.mobileLabel === undefined ? column.label : column.mobileLabel}</h3>
                  </MediaQuery>
                )}
                {value}
              </td>
            )
          })}
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
