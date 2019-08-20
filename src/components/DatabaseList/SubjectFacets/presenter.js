import React from 'react'
import PropTypes from 'prop-types'

import Accordion from 'components/Interactive/Accordion'

import styles from './style.module.css'
import parentStyles from '../style.module.css'

const SubjectFacets = (props) => {
  const displaySubjects = []
  props.subjects.forEach(subject => {
    const isSelected = props.selectedSubjects.some(search => search.sys.id === subject.sys.id)
    const isActive = props.activeSubjects.some(subjectId => subjectId === subject.sys.id)
    if (isActive || displaySubjects.length < props.resultsToShow) {
      displaySubjects.push({
        ...subject,
        selected: isSelected,
      })
    }
  })

  const clearFilter = () => {
    props.applyFilter([])
  }

  return (
    <aside aria-label='Select Subjects to Filter Databases' role='navigation'>
      <Accordion
        className='group'
        header='Filter by Subject'
        headerClassName={parentStyles.navHeader}
        bodyClassName={styles.subjectFacets}
        mobileOnly
      >
        {
          displaySubjects.map(subject => (
            <div key={subject.sys.id} className={styles.subject}>
              <input
                type='checkbox'
                onChange={(event) => props.onCheckboxChanged(event, subject)}
                checked={subject.selected}
              />
              <span className={'link-like ' + styles.subjectLink} tabIndex={0} onClick={() => props.onSubjectClick(subject)}>
                {subject.linkText}
              </span>
            </div>
          ))
        }
      </Accordion>
      <div className={styles.subjectActions}>
        { props.subjects.length > props.resultsToShow && (
          <span className={'link-like ' + styles.showMore} tabIndex={0} onClick={props.showMore}>Show More</span>
        )}
        <button className={styles.applySubjectFilter} onClick={props.applyFilter}>Apply Filter</button>
        <button className={styles.clearSubjectFilter} onClick={clearFilter} disabled={!props.activeSubjects.length}>
          Clear Filter
        </button>
      </div>
    </aside>
  )
}

SubjectFacets.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    linkText: PropTypes.string.isRequired,
  })).isRequired,
  selectedSubjects: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  })).isRequired,
  activeSubjects: PropTypes.array.isRequired,
  resultsToShow: PropTypes.number.isRequired,
  showMore: PropTypes.func,
  applyFilter: PropTypes.func,
  onSubjectClick: PropTypes.func,
  onCheckboxChanged: PropTypes.func,
}

export default SubjectFacets
