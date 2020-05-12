import React from 'react'
import PropTypes from 'prop-types'

import recurringIcon from 'static/images/recurring.svg'

import styles from './style.module.css'

const RecurringIndicator = ({ entry, inline }) => {
  if (!entry.recurring) {
    return null
  }
  return (
    <div className={styles.recurring + (inline ? ` ${styles.inline}` : '')}>
      <img src={recurringIcon} className={styles.icon} alt='' />
      <span>Recurring Event</span>
    </div>
  )
}

RecurringIndicator.propTypes = {
  entry: PropTypes.shape({
    recurring: PropTypes.bool,
  }).isRequired,
  inline: PropTypes.bool,
}

export default RecurringIndicator
