import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import getCourses from '../../actions/personal/courses'
import * as statuses from '../../constants/APIStatuses'
import Loading from '../Messages/Loading'
import Link from '../Link'
import { withErrorBoundary } from '../ErrorBoundary'

import CoursesPresenter from './presenter'

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export class CoursesContainer extends Component {
  checkLoggedIn (props) {
    if (props.courses.state === statuses.NOT_FETCHED &&
      props.loggedIn) {
      props.dispatch(getCourses(props.login.token))
    } else if (props.login.redirectUrl) {
      window.location = props.login.redirectUrl
    }
  }

  componentWillMount () {
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

    const courses = get(this.props, 'courses', { state: statuses.NOT_FETCHED })
    if (courses.state === statuses.FETCHING || courses.state === statuses.NOT_FETCHED) {
      return <Loading />
    }

    return <CoursesPresenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS
  const courses = get(personal, 'courses', { state: statuses.NOT_FETCHED })

  return {
    preview: ownProps.location ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true' : false,
    loggedIn: loggedIn,
    login: personal.login,
    courses: courses,
  }
}

CoursesContainer.propTypes = {
  linkOnly: PropTypes.bool,
}
const CoursesComponent = connect(mapStateToProps)(CoursesContainer)
export default withErrorBoundary(CoursesComponent)
