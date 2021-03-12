import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const ToolTip = (props) => {
  const placeValue = props.value ? 'Yes' : 'No'
  const toolTip = (placeValue === 'No' ? 'Renewal not available. Please return by due date.' : 'Please click the "view in ILL" button to renew.')
  return (
    <div className={styles.tooltip}>{placeValue}
      <span className={styles.tooltiptext}>{toolTip}</span>
    </div>
  )
}

ToolTip.propTypes = {
  value: PropTypes.bool,
}

export default ToolTip
