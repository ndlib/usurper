import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageTitle from '../PageTitle'

class Courses extends Component {
  courseCard (course, showInstructors = true) {
// courseNumber:'27800',
// department:'PSY',
// endDate:1493769600,
// id:'201620-24315',
// instructors:
  // name:'Jessica Payne',
  // netid:'jpayne7',
  // role:'Instructor',
// sectionNumber:'48',
// startDate:1484611200,
// term:'201620',
// title:'Research Lab',
    var instructors = []
    if (showInstructors) {
      for (var i in course.instructors) {
        var instructor = course.instructors[i]
        var key = course.id + instructor.netid
        instructors.push(
          <div key={key}>
            Instructor: {instructor.name}
            <br />
            Email: { instructor.netid }@nd.edu
          </div>
        )
      }
    }

    return (
      <div className='card' key={course.id}>
        <div className='card-header'>
          {course.title}
        </div>
        <div className='card-subtitle'>
          {course.department}
        </div>
        <div className='card-text expandable'>
          {instructors}
        </div>
      </div>
    )
  }

  cardsForArray (outArray, array, key, name, showInstructors = true) {
    if (array && array.length > 0) {
      outArray.push(<h4 key={key}>{name}</h4>)
      for (var i in array) {
        outArray.push(
          this.courseCard(array[i], showInstructors)
        )
      }
    }
  }

  courseCards () {
    var courses = this.props.courses
    var out = []
    if (!courses) {
      return out
    }
    if (courses.enrollments) {
      this.cardsForArray(out, courses.enrollments.current, 'enrollment-current', 'Current Enrollments')
      this.cardsForArray(out, courses.enrollments.future, 'enrollment-future', 'Future Enrollments')
    }
    if (courses.instructs) {
      this.cardsForArray(out, courses.instructs.current, 'instruct-current', 'Current Instructs', false)
      this.cardsForArray(out, courses.instructs.future, 'instruct-future', 'Future Instructs', false)
    }
    return out
  }

  render () {
    if (this.props.linkOnly) {
      return (
        <Link to='/courses'>My Courses</Link>
      )
    }
    return (
      <div key='courses'>
        <PageTitle title='Courses' />
        <Link to='/personal'>My Items</Link>
        <div className='alert'>
          <p><strong>Attention:</strong> Courses listed below are for demonstration purposes only.</p>
        </div>
        <div key='courseCards'>
          { this.courseCards() }
        </div>
      </div>
    )
  }
}

Courses.propTypes = {
  login: PropTypes.object,
  courses: PropTypes.object,
  linkOnly: PropTypes.bool,
}

Courses.contextTypes = {
  router: PropTypes.object,
}

export default Courses
