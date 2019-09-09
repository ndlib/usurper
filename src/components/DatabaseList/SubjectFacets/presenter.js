import React from 'react'
import PropTypes from 'prop-types'

import Accordion from 'components/Interactive/Accordion'

import styles from './style.module.css'
import parentStyles from '../style.module.css'

const SubjectFacets = (props) => {
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
          props.subjects.map(subject => (
            <div key={subject.sys.id} className={styles.subject}>
              <input
                type='checkbox'
                onChange={() => props.onSubjectClick(subject)}
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
  )
}

SubjectFacets.propTypes = {
  subjects: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    linkText: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
  })).isRequired,
  onSubjectClick: PropTypes.func,
}

export default SubjectFacets
