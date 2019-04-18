import React, { Component } from 'react'
import PropTypes from 'prop-types'
import t from 'typy'
import PageTitle from '../../Layout/PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import StaticSidebar from '../../Contentful/StaticContent/Sidebar'
import StaticBody from '../../Contentful/StaticContent/Body'
import StaticAlert from '../../Contentful/StaticContent/Alert'
import UserMenu from '../../Layout/Navigation/UserMenu'
import CourseList from './CourseList'

class Courses extends Component {
  courseLists () {
    const enrollments = t(this.props.courses, 'enrollments').safeObjectOrEmpty
    const instructs = t(this.props.courses, 'instructs').safeObjectOrEmpty

    const currentEnrollCount = t(enrollments, 'current.length').safeNumber
    const currentInstructCount = t(instructs, 'current.length').safeNumber
    const futureEnrollCount = t(enrollments, 'future.length').safeNumber
    const futureInstructCount = t(instructs, 'future.length').safeNumber

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
      <div className='container-fluid content-area'>
        <div key='courses' className='content'>
          <SearchProgramaticSet open={false} />
          <PageTitle title='My Account' children={<UserMenu format='buttons' subheading='Courses' />} />
          <PageTitle title='Courses' hideInPage />

          <StaticBody slug='courses' preview={this.props.preview} />

          <div className='row'>
            <div className='col-md-8 col-sm-7' style={{ position: 'relative' }}>
              <StaticAlert slug='courses' preview={this.props.preview} />
              { this.courseLists() }
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
  preview: PropTypes.bool,
}

Courses.contextTypes = {
  router: PropTypes.object,
}

export default Courses
