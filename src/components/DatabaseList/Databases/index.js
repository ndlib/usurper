import React from 'react'
import PropTypes from 'prop-types'
import DatabaseSummary from './DatabaseSummary'
import styles from '../style.module.css'

const Databases = (props) => {
  const noResultsMessage = props.filterValue
    ? `No results found matching "${props.filterValue}" `
    : `Nothing found for this letter.`
  return (
    <section
      aria-label={`List of all "${props.titleLabel}" Databases`}
      className={styles.dbList}
    >
      { props.list.length
        ? props.list.map((item) => <DatabaseSummary key={item.sys.id} item={item} />)
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
}

export default Databases
