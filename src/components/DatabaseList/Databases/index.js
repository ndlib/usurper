import React from 'react'
import PropTypes from 'prop-types'
import DatabaseSummary from './DatabaseSummary'
import styles from '../style.module.css'

const Databases = (props) => {
  const noResultsMessage = props.filterValue
    ? `No results found matching "${props.filterValue}" `
    : `Nothing found for this letter matching subject filters.`
  const filteredList = props.list.filter((item) => {
    if (!props.subjectFilter.length) {
      return true
    }
    return item.fields.subjects.some(fullSubject => props.subjectFilter.includes(fullSubject.sys.id))
  })

  return (
    <section
      aria-label={`List of all "${props.titleLabel}" Databases`}
      className={styles.dbList}
    >
      { filteredList.length
        ? filteredList.map((item) => (
          <DatabaseSummary key={item.sys.id} item={item} onSubjectFilterApply={props.onSubjectFilterApply} />
        ))
        : noResultsMessage
      }
      { (props.filterValue && props.list.length === 50) && (
        <p>Search is limited to first 50 results. Add more words to your search to see fewer results.</p>
      )}
    </section>
  )
}

Databases.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string,
    }),
  })).isRequired, // NOTE: These should be pre-filtered
  titleLabel: PropTypes.string,
  filterValue: PropTypes.string,
  subjectFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubjectFilterApply: PropTypes.func,
}

export default Databases
