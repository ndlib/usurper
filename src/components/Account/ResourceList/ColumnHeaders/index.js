import React from 'react'
import PropTypes from 'prop-types'

import ColumnHeader from './ColumnHeader'
import typeConstants from '../constants'

import parentStyles from '../style.module.css'
import styles from './style.module.css'

const ColumnHeaders = (props) => {
  return (
    <div className={parentStyles.cardItem + (props.listType === 'history' ? ` ${parentStyles.circHist}` : '')}>
      { Object.keys(typeConstants[props.listType].columns).map((columnKey) => {
        const classes = styles[columnKey + 'Header']
        const label = typeConstants[props.listType].columns[columnKey]
        return <ColumnHeader key={columnKey} displayName={label} columnKey={columnKey} className={classes} {...props} />
      })}
    </div>
  )
}

ColumnHeaders.propTypes = {
  listType: PropTypes.string.isRequired,
}

export default ColumnHeaders
