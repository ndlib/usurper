import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

import SubjectSection from './SubjectSection'

import styles from './style.module.css'

const BestBets = (props) => {
  // Group databases underneath the subject(s) they are best bets for
  const databasesBySubject = {}
  props.subjects.filter(subject => props.subjectFilter.includes(subject.fields.id)).forEach(subject => {
    const matchingDbs = props.databases.filter(db => typy(db.fields, 'bestBets').safeArray.some(search => search.sys.id === subject.sys.id))
    if (matchingDbs.length) {
      databasesBySubject[subject.linkText] = matchingDbs
    }
  })

  const subjectList = Object.keys(databasesBySubject).sort()
  if (!subjectList.length) {
    return null
  }

  return (
    <section className={styles.bestBets}>
      <h1 className={styles.header}>Featured Resources</h1>
      { subjectList.map(subjectName => (
        <React.Fragment key={subjectName}>
          <SubjectSection subjectName={subjectName} databases={databasesBySubject[subjectName]} onSubjectFilterApply={props.onSubjectFilterApply} />
          { subjectName !== subjectList.slice(-1)[0] && (
            <hr />
          )}
        </React.Fragment>
      ))}
    </section>
  )
}

BestBets.propTypes = {
  databases: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    fields: PropTypes.shape({
      bestBets: PropTypes.array,
    }).isRequired,
  })).isRequired,
  subjects: PropTypes.array,
  subjectFilter: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSubjectFilterApply: PropTypes.func,
}

export default BestBets
