import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const ToolTip = (props) => {
  const toolTip = (props.value === 'No' ? 'Renewal not available. Please return by due date.' : 'Please click the "view in ILL" button to renew')
  return (
    <div className={styles.tooltip}>{props.value}
      <span className={styles.tooltiptext}>{toolTip}</span>
    </div>
  )
}

ToolTip.propTypes = {
  value: PropTypes.string,
}

// ToolTip.defaultProps = {
//   value: 'Yes',
// }

export default ToolTip
