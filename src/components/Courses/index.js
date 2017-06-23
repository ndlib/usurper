'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getCourses from '../../actions/personal/courses'
import * as statuses from '../../constants/APIStatuses'
import Loading from '../Messages/Loading'

import CoursesPresenter from './presenter'

class CoursesContainer extends Component {
  checkLoggedIn (props) {
    if (!props.courses &&
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
    if (!this.props.courses) {
      return <Loading />
    } else if (this.props.courses.state == statuses.FETCHING) {
      return <Loading />
    }

    return <CoursesPresenter {...this.props} />
  }
}

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export const mapStateToProps = (state) => {
  const { personal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS

  const courses = personal.courses

  return {
    loggedIn: loggedIn,
    login: personal.login,
    courses: courses,
  }
}

export default connect(mapStateToProps)(CoursesContainer)
