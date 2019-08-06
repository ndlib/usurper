import React from 'react'
import PropTypes from 'prop-types'

import * as helper from 'constants/HelperFunctions'

import styles from '../style.module.css'
import clearIcon from 'static/images/clear-icon.svg'

const ActiveFiltersList = (props) => {
  const sortedList = helper.sortList(props.subjects, 'linkText', 'asc')
  return (
    <div className={styles.activeFilters}>
      { props.letter && (
        <div>
          <span className={styles.activeFiltersLabel}>Name Starts With:</span>
          <span
            className={styles.itemTag}
            onClick={props.removeLetterFilter}
            title={`Click to remove filter: Starts with ${props.letter.toUpperCase()}`}
          >
            <img src={clearIcon} className={styles.clearIcon} alt='X' />
            <span>{props.letter.toUpperCase()}</span>
          </span>
        </div>
      )}
      { props.subjects.length > 0 && (
        <div>
          <span className={styles.activeFiltersLabel}>Active Subject Filters:</span>
          { sortedList.map(subject => (
            <span
              key={subject.sys.id}
              className={styles.itemTag}
              onClick={() => props.removeSubjectFromFilter(subject.sys.id)}
              title={`Click to remove subject: ${subject.linkText}`}
            >
              <img src={clearIcon} className={styles.clearIcon} alt='X' />
              <span>{subject.linkText}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

ActiveFiltersList.propTypes = {
  subjects: PropTypes.array.isRequired,
  letter: PropTypes.string,
  removeSubjectFromFilter: PropTypes.func.isRequired,
  removeLetterFilter: PropTypes.func.isRequired,
}

export default ActiveFiltersList
