'use strict'

import React, { Component } from 'react'
import Link from '../Link'
import PropTypes from 'prop-types'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'
import Lgicon from '../../static/images/icons/libguide.png'
import LogOut from '../LogOut'
import StaticSidebar from '../Contentful/StaticContent/Sidebar'
import StaticBody from '../Contentful/StaticContent/Body'
import StaticAlert from '../Contentful/StaticContent/Alert'

class Courses extends Component {
  instructorCard (course) {
    let courseReserves = ''
    if (course.courseReserveLink) {
      courseReserves = <a href={course.courseReserveLink}>Course Reserves</a>
    }
    let courseGuides = ''
    if (course.courseGuides.length > 0) {
      courseGuides = (
        <ul>
          {course.courseGuides.map((courseGuide, index) =>
            <li key={index}><a href={courseGuide}><img src={Lgicon} /> Course Guide</a></li>
          )}
        </ul>
      )
    }
    let subtitle = ''
    if (course.codes) {
      subtitle = course.codes.join(', ') + ' - ' + course.sectionNumbers.join(', ')
    }
    let pathfinders = ''
    if (Object.keys(course.pathfinders).length) {
      pathfinders = (
        <ul>
          {Object.keys(course.pathfinders).map((key) =>
            <li key={key}><Link to={course.pathfinders[key].url}>{course.pathfinders[key].title} Resources</Link></li>
          )}
        </ul>
      )
    }
    return (
      <div className='course-card' key={course.id}>
        <div className='course'>
          <p className='course-header'>{course.title}</p>
          <small className='course-subtitle'>{subtitle}</small>
        </div>
        <div className='course-reserves'>
          {courseReserves}
        </div>
        <div className='course-resources'>
          {pathfinders}
        </div>
      </div>
    )
  }

  enrollmentCard (course) {
// courseNumber:'27800',
// department:'PSY',
// endDate:1493769600,
// id:'201620-24315',
// instructor_name:
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

    let subtitle = course.instructor_name
    if (course.codes) {
      subtitle = course.codes.join(', ') + ' - ' + course.sectionNumbers.join(', ')
    }
    let pathfinder = ''
    if (course.pathfinder) {
      pathfinder = <Link to={course.pathfinder.url}>{course.pathfinder.title} Resources</Link>
    }
    return (
      <div className='course-card' key={course.id}>
        <div className='course'>
          <p className='course-header'>{course.title}</p>
          <small className='course-subtitle'>{subtitle}</small>
        </div>
        <div className='course-reserves'>
          {courseReserves}
        </div>
        <div className='course-resources'>
          {pathfinder}
        </div>
      </div>
    )
  }

  cardsForArray (outArray, array, key, name) {
    var cards = []
    if (array && array.length > 0) {
      cards = array.map((row) => {
        if (row.type === 'section') {
          return this.enrollmentCard(row)
        } else if (row.type === 'instructor') {
          return this.instructorCard(row)
        }
      })
      outArray.push(
        <div className='course-section' key={key + '-section'}>
          <h3 className='course-title' key={key}>{name}</h3>
          <div className='course-card course-header'>
            <div>
              Course
            </div>
            <div>
              Course Reserves
            </div>
            <div>
              Subject Resources
            </div>
          </div>
          {cards}
        </div>
      )
    }
    return cards.length
  }

  courseCards () {
    var courses = this.props.courses.courses
    var out = []
    if (!courses) {
      return (<p className='noClasses'>No Classes to display for the current semester</p>)
    }

    let currentTitle = 'Current Courses'
    let upcomingTitle = 'Upcoming Courses'

    let cardCount = this.cardsForArray(out, courses.enrollments.current, 'enrollment-current', currentTitle)
    this.cardsForArray(out, courses.instructs.current, 'instruct-current', cardCount > 0 ? '' : currentTitle)

    cardCount = this.cardsForArray(out, courses.enrollments.future, 'enrollment-future', upcomingTitle)
    this.cardsForArray(out, courses.instructs.future, 'instruct-future', cardCount > 0 ? '' : upcomingTitle)

    if (out.length === 0) {
      return (
        <p className='noClasses'>
          No Classes to display for the current semester.
        </p>)
    }

    return out
  }

  render () {
    return (
      <div className='container-fluid content-area'>
        <div key='courses' className='content'>
          <LogOut />
          <Link to='/items-requests' className='button fright tab'>My Items</Link>

          <PageTitle title='Courses' classaName='hr-cor' />
          <SearchProgramaticSet open={false} />

          <StaticBody slug='courses' preview={this.props.preview} />

          <div className='row'>
            <div className='col-md-8 col-sm-7'>
              <StaticAlert slug='courses' preview={this.props.preview} />
              <div key='courseCards'>
                { this.courseCards() }
              </div>
            </div>
            <StaticSidebar slug='courses' preview={this.props.preview} />
          </div>
        </div>
      </div>
    )
  }
}

Courses.propTypes = {
  courses: PropTypes.object,
  preview: PropTypes.bool,
}

Courses.contextTypes = {
  router: PropTypes.object,
}

export default Courses
