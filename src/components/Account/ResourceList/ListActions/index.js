import React from 'react'
import PropTypes from 'prop-types'

import RenewButton from './RenewButton'
import ExportButton from './ExportButton'
import DeleteButton from './DeleteButton'

import typeConstants from '../constants'

import styles from './style.module.css'

const ListActions = (props) => {
  const config = typeConstants[props.listType]
  return (
    <div className={styles.itemListGlobalActions}>
      { config.renewButton && (
        <RenewButton items={props.list} className={styles.globalRenew} />
      )}
      { config.exportButton && (
        <ExportButton items={props.list} className={styles.globalExport} />
      )}
      { config.deleteButton && (
        <DeleteButton items={props.list} className={styles.globalDelete} />
      )}
    </div>
  )
}

ListActions.propTypes = {
  list: PropTypes.array.isRequired,
  listType: PropTypes.string.isRequired,
}

export default ListActions
