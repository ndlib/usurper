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
} from '../../actions/personal/settings'
import { getUser } from '../../actions/personal/loanResources'
import Loading from '../Messages/Loading'

import * as states from '../../constants/APIStatuses'

const homeLibraries = [
  { value: 'HESB', title: 'Hesburgh Library' },
  { value: 'ARCHT', title: 'Architecture Library' },
  { value: 'BIC', title: 'Business Library' },
  { value: 'CHEMP', title: 'Chemistry ‐ Physics Library' },
  { value: 'ENGIN', title: 'Engineering Library' },
  { value: 'MATH', title: 'Mathematics Library' },
  { value: 'MUSIC', title: 'Music Library' },
  { value: 'RADLAB', title: 'Radiation Lab Reading Room' },
  { value: 'NDCAM', title: 'I would prefer departmental delivery' },
]

const updateStatus = {
  SUCCESS: 1,
  FAILURE: -1,
  UPDATING: 0,
}

class SettingsContainer extends Component {
  checkLoggedIn (props) {
    if (props.loggedIn && props.homeIndex === null && !props.userState) {
      props.getUser()
    }
  }

  componentDidMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
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
    } else if (this.props.redirectUrl) {
      window.location = this.props.redirectUrl
    } else {
      return <Loading message='Loading Your Account' />
    }
  }
}

const apiStateToInt = (state) => {
  if (!state) {
    return updateStatus.SUCCESS
  }
  switch (state) {
    case states.SUCCESS:
      return updateStatus.SUCCESS
    case states.ERROR:
      return updateStatus.FAILURE
    case states.FETCHING:
      return updateStatus.FETCHING
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, settings } = state

  let loggedIn = Boolean(state.personal.login && personal.login.token) === true

  let currentHomeTitle = personal.user ? personal.user.homeLibrary : null
  let homeIndex = null
  if (currentHomeTitle) {
    let libraryName = currentHomeTitle.split(' ')[0]
    for (let i = 0; i < homeLibraries.length; ++i) {
      if (homeLibraries[i].title.includes(libraryName)) {
        homeIndex = i
        break
      }
    }
  }

  let libraryState = settings[KIND.homeLibrary] ? settings[KIND.homeLibrary].state : null

  return {
    homeIndex: homeIndex,
    userState: personal.user ? personal.user.state : null,
    preview: (new URLSearchParams(ownProps.location.search)).get('preview') === 'true',
    loggedIn: loggedIn,
    redirectUrl: personal.login.redirectUrl,
    libraryStatus: apiStateToInt(libraryState),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setHomeLibrary,
    getUser,
    getCircStatus,
    setCircStatus,
  }, dispatch)
}

SettingsContainer.propTypes = {
  loggedIn: PropTypes.bool,
  preview: PropTypes.bool,
  redirectUrl: PropTypes.string,
  setHomeLibrary: PropTypes.func,
  homeIndex: PropTypes.number,
  setCircStatus: PropTypes.func,
  getCircStatus: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
