import React from 'react'
import PropTypes from 'prop-types'

import * as helper from 'constants/HelperFunctions'

import styles from '../style.module.css'
import clearIcon from 'static/images/clear-icon.svg'

const ActiveFiltersList = (props) => {
  const sortedList = helper.sortList(props.subjects, 'linkText', 'asc')
  return (
    <div className={styles.activeFilters}>
      <span className={styles.activeFiltersLabel}>Active Subject Filters:</span>
      { sortedList.map(subject => (
        <span
          key={subject.sys.id}
          className={styles.dbSubject}
          onClick={() => props.removeSubjectFromFilter(subject.sys.id)}
          title={`Click to remove subject: ${subject.linkText}`}
        >
          <img src={clearIcon} className={styles.clearIcon} alt='X' />
          <span>{subject.linkText}</span>
        </span>
      ))}
    </div>
  )
}

ActiveFiltersList.propTypes = {
  subjects: PropTypes.array.isRequired,
  removeSubjectFromFilter: PropTypes.func.isRequired,
}

export default ActiveFiltersList
