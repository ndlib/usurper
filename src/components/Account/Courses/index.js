import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'
import getCourses from 'actions/personal/courses'
import * as statuses from 'constants/APIStatuses'
import Link from 'components/Interactive/Link'

import CoursesPresenter from './presenter'

export class CoursesContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    if (this.props.loggedIn && this.props.courses.state === statuses.NOT_FETCHED) {
      this.props.getCourses()
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    if (this.props.linkOnly) {
      return (
        <Link to='/courses' className='button tab margin-right-15'>Courses</Link>
      )
    }

    return <CoursesPresenter courses={this.props.courses.courseData} />
  }
}

export const mapStateToProps = (state) => {
  const { personal } = state

  return {
    loggedIn: typy(typy(personal, 'login.token').safeString).isTruthy,
    courses: personal.courses,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCourses }, dispatch)
}

CoursesContainer.propTypes = {
  linkOnly: PropTypes.bool,
  loggedIn: PropTypes.bool,
  courses: PropTypes.shape({
    state: PropTypes.string,
    courseData: PropTypes.object,
  }),
  getCourses: PropTypes.func,
}
const CoursesComponent = connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
export default CoursesComponent
