import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import PropTypes from 'prop-types'
import MediaQuery from 'react-responsive'

import './style.css'

const Table = ({ className, columns, data }) => {
  return (
    <table
      role='table'
      className={`responsive-table ${className || ''}`}
    >
      <MediaQuery minWidth={620}>
        <TableHeader columns={columns} />
      </MediaQuery>
      <TableBody
        columns={columns}
        data={data}
      />
    </table>
  )
}

export default Table

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
    label: PropTypes.string,
    mobileLabel: PropTypes.string,
  })).isRequired,
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
}
