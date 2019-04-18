import React from 'react'
import PropTypes from 'prop-types'
import CourseCard from './CourseCard'
import styles from './style.module.css'

const CourseList = (props) => {
  if (!props.courses || !props.courses.length) {
    return null
  }

  return (
    <div className={styles.courseSection}>
      <h3 className={styles.courseSectionTitle}>{props.title}</h3>
      <div className={[styles.courseCard, styles.courseHeader].join(' ')}>
        <div>Course</div>
        <div>Course Reserves</div>
        <div>Subject Resources</div>
      </div>
      { props.courses.map((row) =>
        <CourseCard key={row.id} course={row} />
      )}
    </div>
  )
}

CourseList.propTypes = {
  courses: PropTypes.array,
  title: PropTypes.string,
}

export default CourseList
