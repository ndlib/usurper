import React from 'react'
import Table from 'components/Table'
import PropTypes from 'prop-types'

const FloorsTable = (props) => {
  const columns = [
    { path: 'floorsText', label: 'Floors', mobileLabel: 'Floors' },
    { path: 'fields.callNumberRange', label: 'Call Numbers', mobileLabel: 'Call Numbers' },
    { path: 'spacesText', label: 'Service Points, Centers, and Spaces', mobileLabel: 'Service Points, Centers, and Spaces' },
  ]

  return (
    <Table columns={columns} data={props.floorData} className='floorsTable' />
  )
}

export default FloorsTable

FloorsTable.propTypes = {
  floorData: PropTypes.array.isRequired,
}
