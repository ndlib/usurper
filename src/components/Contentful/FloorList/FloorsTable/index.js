import React from 'react'
import Table from 'components/Table'
import PropTypes from 'prop-types'

const FloorsTable = (props) => {
  const columns = [
    { path: 'floorsText', label: 'Floors' },
    { path: 'fields.callNumberRange', label: 'Call Numbers' },
    { path: 'spacesText', label: 'Service Points, Centers, and Spaces' },
  ]

  return (
    <Table columns={columns} data={props.floorData} />
  )
}

export default FloorsTable

FloorsTable.propTypes = {
  floorData: PropTypes.array.isRequired,
}
