import React, { Component } from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'
import AccountPageWrapper from '../AccountPageWrapper'
import CourseList from './CourseList'

class Courses extends Component {
  constructor (props) {
    super(props)
    this.courseLists = this.courseLists.bind(this)
  }

  courseLists () {
    const enrollments = typy(this.props.courses, 'enrollments').safeObjectOrEmpty
    const instructs = typy(this.props.courses, 'instructs').safeObjectOrEmpty

    const currentEnrollCount = typy(enrollments, 'current.length').safeNumber
    const currentInstructCount = typy(instructs, 'current.length').safeNumber
    const futureEnrollCount = typy(enrollments, 'future.length').safeNumber
    const futureInstructCount = typy(instructs, 'future.length').safeNumber

    if (currentEnrollCount + currentInstructCount + futureEnrollCount + futureInstructCount === 0) {
      return (<p className='noClasses'>No classes to display for the current semester</p>)
    }

    const currentTitle = 'Current Courses'
    const upcomingTitle = 'Upcoming Courses'

    return (
      <React.Fragment>
        <CourseList courses={enrollments.current} title={currentTitle} />
        <CourseList courses={instructs.current} title={currentEnrollCount > 0 ? '' : currentTitle} />
        <CourseList courses={enrollments.future} title={upcomingTitle} />
        <CourseList courses={instructs.future} title={futureEnrollCount > 0 ? '' : upcomingTitle} />
      </React.Fragment>
    )
  }

  render () {
    return (
      <AccountPageWrapper title='Courses' slug='courses'>
        { this.courseLists() }
        <div style={{ fontStyle: 'italic' }}>
          If your courses are not showing, check them in the&nbsp;
          <a href='https://reserves.library.nd.edu' target='_blank' rel='noopener noreferrer'>course reserves
          system</a> or contact the circulation desk at <a href='mailto:circ@nd.edu'>circ@nd.edu</a> or&nbsp;
          <a href='tel:+15746316679'>(574) 631-6679</a>.
        </div>
      </AccountPageWrapper>
    )
  }
}

Courses.propTypes = {
  courses: PropTypes.shape({
    enrollments: PropTypes.shape({
      current: PropTypes.array,
      future: PropTypes.array,
    }),
    instructs: PropTypes.shape({
      current: PropTypes.array,
      future: PropTypes.array,
    }),
  }),
}

Courses.contextTypes = {
  router: PropTypes.object,
}

export default Courses
