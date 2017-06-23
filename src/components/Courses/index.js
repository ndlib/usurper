'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getCourses from '../../actions/personal/courses'
import * as statuses from '../../constants/APIStatuses'
import Loading from '../Messages/Loading'

import CoursesPresenter from './presenter'

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

class CoursesContainer extends Component {
  checkLoggedIn (props) {
    if (props.courses.state === statuses.NOT_FETCHED &&
      props.loggedIn) {
      props.dispatch(getCourses(props.login.token))
    }
  }

  componentWillMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    let courses = get(this.props, 'courses', { state: statuses.NOT_FETCHED })
    if (courses.state === statuses.FETCHING || courses.state === statuses.NOT_FETCHED) {
      return <Loading />
    }

    return <CoursesPresenter {...this.props} />
  }
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS
  const courses = get(personal, 'courses', { state: statuses.NOT_FETCHED })

  return {
    loggedIn: loggedIn,
    login: personal.login,
    courses: courses,
  }
}

export default connect(mapStateToProps)(CoursesContainer)
