import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'
import getCourses from 'actions/personal/courses'
import * as statuses from 'constants/APIStatuses'
import Loading from 'components/Messages/Loading'
import Link from 'components/Interactive/Link'

import CoursesPresenter from './presenter'

export class CoursesContainer extends Component {
  checkLoggedIn (props) {
    if (props.courses.state === statuses.NOT_FETCHED && props.loggedIn) {
      props.getCourses(props.login.token)
    } else if (props.login.redirectUrl) {
      window.location.replace(props.login.redirectUrl)
    }
  }

  componentDidMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    if (this.props.linkOnly) {
      return (
        <Link to='/courses' className='button tab margin-right-15'>Courses</Link>
      )
    }

    if (this.props.login.state === statuses.FETCHING || this.props.login.state === statuses.NOT_FETCHED) {
      return <Loading />
    }

    return <CoursesPresenter preview={this.props.preview} courses={this.props.courses.courseData} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state
  const loggedIn = typy(typy(personal, 'login.token').safeString).isTruthy
  const courses = typy(personal, 'courses').safeObject || { state: statuses.NOT_FETCHED }

  return {
    preview: ownProps.location ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true' : false,
    loggedIn: loggedIn,
    login: personal.login,
    courses: courses,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getCourses }, dispatch)
}

CoursesContainer.propTypes = {
  linkOnly: PropTypes.bool,
  loggedIn: PropTypes.bool, // eslint-disable-line react/no-unused-prop-types
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
    redirectUrl: PropTypes.string,
  }),
  courses: PropTypes.shape({
    state: PropTypes.string,
    courseData: PropTypes.object,
  }),
  getCourses: PropTypes.func, // eslint-disable-line react/no-unused-prop-types
  preview: PropTypes.bool,
}
const CoursesComponent = connect(mapStateToProps, mapDispatchToProps)(CoursesContainer)
export default CoursesComponent
