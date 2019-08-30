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
  const modified = props.selectedSubjects.length !== props.activeSubjects.length || props.selectedSubjects.some(subject => {
    return !props.activeSubjects.includes(subject.sys.id)
  })

  return (
    <React.Fragment>
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
      </aside>
      <div className={styles.subjectActions + (modified ? '' : ` ${styles.hidden}`)}>
        { props.subjects.length > props.resultsToShow && (
          <span className={'link-like ' + styles.showMore} tabIndex={0} onClick={props.showMore}>Show More</span>
        )}
        <button className={styles.applySubjectFilter} onClick={props.applyFilter}>Apply Filter</button>
        <button className={styles.clearSubjectFilter} onClick={props.clearFilter}>Undo Changes</button>
      </div>
    </React.Fragment>
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
  clearFilter: PropTypes.func,
  onSubjectClick: PropTypes.func,
  onCheckboxChanged: PropTypes.func,
}

export default SubjectFacets
