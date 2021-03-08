import React from 'react'
import PropTypes from 'prop-types'

import styles from './style.module.css'

const ToolTip = (props) => {
  return (
    <div className={styles.tooltip}>{props.value}
      <span className={styles.tooltiptext}>Hover text</span>
    </div>
  )
}

ToolTip.propTypes = {
  value: PropTypes.string,
}

ToolTip.defaultProps = {
  value: 'NDU',
}

export default ToolTip
