import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Lgicon from '../../static/images/icons/libguide.png'

class Courses extends Component {
  courseCard (course, showInstructors = true) {
    console.log(course)
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
    let courseReserves = ''
    if (course.courseReserveLink) {
      courseReserves = <a href={course.courseReserveLink}>Course Reserves</a>
    }

    let courseGuide = ''
    if (course.courseGuide) {
      courseGuide = <a href={course.courseGuide}><img src={Lgicon} /> Course Guide</a>
    }

    return (
      <div className='course-card' key={course.id}>
        <div className='course'>
          <p className='course-header'>{course.title}</p>
          <small className='course-subtitle'>{course.instructor_name}</small>
        </div>
        <div className='course-guides'>
          {courseGuide}
        </div>
        <div className='course-reserves'>
          {courseReserves}
        </div>
        <div className='course-resources'>
          <Link to={course.pathfinder}>Biology Resources</Link>
        </div>
      </div>
    )
  }

  cardsForArray (outArray, array, key, name, showInstructors = true) {
    var cards = []
    if (array && array.length > 0) {
      for (var i in array) {
        cards.push(
          this.courseCard(array[i], showInstructors)
        )
      }

      outArray.push(
        <div className='course-section' key={key + '-section'}>
          <h3 className='course-title' key={key}>{name}</h3>
          {cards}
        </div>
      )
    }
  }

  courseCards () {
    var courses = this.props.courses.courses
    var out = []
    if (!courses) {
      return out
    }
    if (courses.enrollments) {
      this.cardsForArray(out, courses.enrollments.current, 'enrollment-current', 'Current Courses')
      this.cardsForArray(out, courses.enrollments.future, 'enrollment-future', 'Upcoming Courses')
    }
    if (courses.instructs) {
      this.cardsForArray(out, courses.instructs.current, 'instruct-current', 'Current Courses', false)
      this.cardsForArray(out, courses.instructs.future, 'instruct-future', 'Upcomming Courses', false)
    }
    return out
  }

  render () {
    if (this.props.linkOnly) {
      return (
        <Link to='/courses' className='button fright'>My Courses</Link>
      )
    }
    return (
      <div key='courses' className='content'>
        <PageTitle title='Courses' />
        <SearchProgramaticSet open={false} />
        <Link to='/personal' className='button fright'>My Items</Link>
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
