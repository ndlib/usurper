import React from 'react'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import PropTypes from 'prop-types'

const Table = ({ columns, data }) => {
  return (
    <table role='table' >
      <TableHeader columns={columns} />
      <TableBody columns={columns} data={data} />
    </table>
  )
}

export default Table

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
}
