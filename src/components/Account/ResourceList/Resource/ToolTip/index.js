import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const ToolTip = (props) => {
  const value = props.value ? 'Yes' : 'No'
  const tip = (props.value === 'No' ? 'Renewal not available. Please return by due date.' : 'Please click the "view in ILL" button to renew')
  return (
    <div aria-labelledby='tip' className={styles.tooltip}>{value}
      <span id='tip' className={styles.tooltiptext}>{tip}</span>
    </div>
  )
}

ToolTip.propTypes = {
  value: PropTypes.bool,
}

export default ToolTip
