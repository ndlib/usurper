import React from 'react'
import PropTypes from 'prop-types'
import t from 'typy'
import Link from 'components/Interactive/Link'
import styles from '../style.module.css'

const makePathFinders = (course) => {
  const arr = t(course, 'pathfinders').isArray ? course.pathfinders : (course.pathfinder ? [ course.pathfinder ] : [])
  if (!arr.length) {
    return null
  }

  return (
    <ul>
      { arr.map((item) =>
        <li key={item.url}>
          <Link to={item.url}>{item.title} Resources</Link>
        </li>
      )}
    </ul>
  )
}

const CourseCard = (props) => {
  const pathfinders = makePathFinders(props.course)
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
        {pathfinders}
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
    pathfinder: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    }),
    pathfinders: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string,
    })),
    codes: PropTypes.array,
    sectionNumbers: PropTypes.array,
    instructor_name: PropTypes.string,
  }),
}

export default CourseCard
