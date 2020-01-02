import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import recurringIcon from 'static/images/recurring.svg'

import styles from './style.module.css'

const RecurringIndicator = ({ entry, inline }) => {
  return (typy(entry, 'dateSchedule.length').safeNumber > 0) ? (
    <div className={styles.recurring + (inline ? ` ${styles.inline}` : '')}>
      <img src={recurringIcon} className={styles.icon} alt='' />
      <span>Recurring Event</span>
    </div>
  ) : null
}

RecurringIndicator.propTypes = {
  entry: PropTypes.shape({
    dateSchedule: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  inline: PropTypes.bool,
}

export default RecurringIndicator
