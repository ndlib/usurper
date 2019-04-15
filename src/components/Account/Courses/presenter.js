import React, { Component } from 'react'
import Link from '../../Link'
import PropTypes from 'prop-types'
import PageTitle from '../../Layout/PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'
import StaticAlert from '../../Contentful/StaticContent/Alert'
import UserMenu from '../../Layout/Navigation/UserMenu'

class Courses extends Component {
  instructorCard (course) {
    let courseReserves = ''
    if (course.courseReserveLink) {
      courseReserves = <a href={course.courseReserveLink}>Course Reserves</a>
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
    let cards = []
    if (array && array.length > 0) {
      cards = array.map((row) => {
        if (row.type === 'section') {
          return this.enrollmentCard(row)
        } else if (row.type === 'instructor') {
          return this.instructorCard(row)
        }
        return null
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
    const courses = this.props.courses.courses
    const out = []
    if (!courses) {
      return (<p className='noClasses'>No classes to display for the current semester</p>)
    }

    const currentTitle = 'Current Courses'
    const upcomingTitle = 'Upcoming Courses'

    const enrollments = courses.enrollments ? courses.enrollments : {}
    const instructs = courses.instructs ? courses.instructs : {}

    let cardCount = this.cardsForArray(out, enrollments.current, 'enrollment-current', currentTitle)
    this.cardsForArray(out, instructs.current, 'instruct-current', cardCount > 0 ? '' : currentTitle)

    cardCount = this.cardsForArray(out, enrollments.future, 'enrollment-future', upcomingTitle)
    this.cardsForArray(out, instructs.future, 'instruct-future', cardCount > 0 ? '' : upcomingTitle)

    if (out.length === 0) {
      return (
        <p className='noClasses'>
          No classes to display for the current semester.
        </p>)
    }

    return out
  }

  render () {
    return (
      <div className='container-fluid content-area'>
        <div key='courses' className='content'>
          <SearchProgramaticSet open={false} />
          <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Courses' />} />
          <PageTitle title='Courses' hideInPage />

          <StaticBody slug='courses' preview={this.props.preview} />

          <div className='row'>
            <div className='col-md-8 col-sm-7' style={{ position: 'relative' }}>
              <StaticAlert slug='courses' preview={this.props.preview} />
              <div key='courseCards'>
                { this.courseCards() }
              </div>
              <div style={{ fontStyle: 'italic' }}>
                If your courses are not showing, check them in the&nbsp;
                <a href='https://reserves.library.nd.edu' target='_blank' rel='noopener noreferrer'>course reserves
                system</a> or contact the circulation desk at <a href='mailto:circ@nd.edu'>circ@nd.edu</a> or&nbsp;
                <a href='tel:+15746316679'>(574) 631-6679</a>.
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
