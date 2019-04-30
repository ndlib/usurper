import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import {
  setHomeLibrary,
  getCircStatus,
  setCircStatus,
  KIND,
} from 'actions/personal/settings'
import getToken from 'actions/personal/token'
import Loading from 'components/Messages/Loading'

import * as states from 'constants/APIStatuses'

const homeLibraries = [
  { value: 'HESB', title: 'Hesburgh Library' },
  { value: 'ARCHT', title: 'Architecture Library' },
  { value: 'BIC', title: 'Business Library' },
  { value: 'CHEMP', title: 'Chemistry ‐ Physics Library' },
  { value: 'ENGIN', title: 'Engineering Library' },
  { value: 'MATH', title: 'Mathematics Library' },
  { value: 'MUSIC', title: 'Music Library' },
  // { value: 'RADLAB', title: 'Radiation Lab Reading Room' }, // This was throwing an error.
  { value: 'NDCAM', title: 'I would prefer departmental delivery' },
]

export class SettingsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkLoggedIn = this.checkLoggedIn.bind(this)
  }

  checkLoggedIn () {
    if (!this.props.loggedIn && this.props.login.state === states.NOT_FETCHED) {
      this.props.getToken()
    } else if (this.props.login.redirectUrl) {
      window.location.replace(this.props.login.redirectUrl)
    }
  }

  componentDidMount () {
    this.checkLoggedIn()
  }

  componentDidUpdate () {
    this.checkLoggedIn()
  }

  render () {
    if (this.props.loggedIn) {
      return <Presenter
        preview={this.props.preview}
        homeLibraries={homeLibraries}
        setHomeLibrary={this.props.setHomeLibrary}
        homeIndex={this.props.homeIndex}
        libraryStatus={this.props.libraryStatus}
        setCircStatus={this.props.setCircStatus}
        getCircStatus={this.props.getCircStatus}
      />
    } else {
      return <Loading message='Loading Your Account' />
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, settings } = state

  const currentHomeTitle = personal.user ? personal.user.homeLibrary : null
  let homeIndex = null
  if (currentHomeTitle) {
    const libraryName = currentHomeTitle.split(' ')[0]
    for (let i = 0; i < homeLibraries.length; ++i) {
      if (homeLibraries[i].title.includes(libraryName)) {
        homeIndex = i
        break
      }
    }
  }

  const libraryState = (settings && settings[KIND.homeLibrary]) ? settings[KIND.homeLibrary].state : states.NOT_FETCHED

  return {
    homeIndex: homeIndex,
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
    loggedIn: !!(personal.login && personal.login.token),
    login: personal.login,
    redirectUrl: personal.login.redirectUrl,
    libraryStatus: libraryState,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setHomeLibrary,
    getToken,
    getCircStatus,
    setCircStatus,
  }, dispatch)
}

SettingsContainer.propTypes = {
  loggedIn: PropTypes.bool,
  login: PropTypes.object,
  preview: PropTypes.bool,
  setHomeLibrary: PropTypes.func,
  homeIndex: PropTypes.number,
  setCircStatus: PropTypes.func,
  getCircStatus: PropTypes.func,
  libraryStatus: PropTypes.string,
  getToken: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
