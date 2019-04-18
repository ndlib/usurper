import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import PathFinders from './PathFinders'

import styles from '../style.module.css'

const CourseCard = (props) => {
  const courseReserves = props.course.courseReserveLink
    ? (<Link to={props.course.courseReserveLink}>Course Reserves</Link>)
    : null
  const subtitle = props.course.codes
    ? (props.course.codes.join(', ') + ' - ' + props.course.sectionNumbers.join(', '))
    : props.course.instructor_name

  return (
    <div className={styles.courseCard}>
      <div className={styles.courseColumn}>
        <p className={styles.courseName}>{props.course.title}</p>
        <small className={styles.courseSubtitle}>{subtitle}</small>
      </div>
      <div className={styles.courseReserves}>
        {courseReserves}
      </div>
      <div className={styles.courseResources}>
        <PathFinders data={props.course.pathfinders || (props.course.pathfinder ? [props.course.pathfinder] : [])} />
      </div>
    </div>
  )
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    title: PropTypes.string,
    courseReserveLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    pathfinder: PropTypes.object,
    pathfinders: PropTypes.array,
    codes: PropTypes.array,
    sectionNumbers: PropTypes.array,
    instructor_name: PropTypes.string,
  }),
}

export default CourseCard
