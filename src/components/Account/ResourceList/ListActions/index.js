import React from 'react'
import PropTypes from 'prop-types'

import RenewButton from './RenewButton'
import ExportButton from './ExportButton'
import DeleteButton from './DeleteButton'

import typeConstants from '../constants'

const ListActions = (props) => {
  const config = typeConstants[props.listType]
  return (
    <div className='item-list-global-actions'>
      { config.renewButton && (
        <RenewButton items={props.list} className='globalRenew' />
      )}
      { config.exportButton && (
        <ExportButton items={props.list} className='globalExport' />
      )}
      { config.deleteButton && (
        <DeleteButton items={props.list} className='globalDelete' />
      )}
    </div>
  )
}

ListActions.propTypes = {
  list: PropTypes.array.isRequired,
  listType: PropTypes.string.isRequired,
}

export default ListActions
