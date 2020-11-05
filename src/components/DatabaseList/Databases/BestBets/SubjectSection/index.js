import React from 'react'
import PropTypes from 'prop-types'

import DatabaseSummary from '../../DatabaseSummary'

import styles from '../style.module.css'

const SubjectSection = (props) => {
  return (
    <div className={styles.subjectSection}>
      <h2 className={styles.subjectHeading}>{props.subjectName}</h2>
      { props.databases.map(db => (
        <DatabaseSummary
          key={db.sys.id}
          item={db}
          onSubjectFilterApply={props.onSubjectFilterApply}
          facets={props.facets}
        />
      ))}
    </div>
  )
}

SubjectSection.propTypes = {
  subjectName: PropTypes.string.isRequired,
  databases: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    fields: PropTypes.shape({
      bestBets: PropTypes.array,
      subjects: PropTypes.array,
    }).isRequired,
  })).isRequired,
  onSubjectFilterApply: PropTypes.func,
  facets: PropTypes.array.isRequired,
}

export default SubjectSection
