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
  // { value: 'RADLAB', title: 'Radiation Lab Reading Room' }, // This was throwing an error.
  { value: 'NDCAM', title: 'I would prefer departmental delivery' },
]

const updateStatus = {
  NOT_SET: -2,
  FAILURE: -1,
  UPDATING: 0,
  SUCCESS: 1,
}

class SettingsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkLoggedIn = this.checkLoggedIn.bind(this)
  }

  checkLoggedIn (props) {
    if (props.loggedIn && props.homeIndex === null && !props.userState) {
      props.getUser()
    } else if (props.redirectUrl) {
      window.location.replace(props.redirectUrl)
    }
  }

  componentDidMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    if (this.props.loggedIn && this.props.alephId) {
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

const apiStateToInt = (state) => {
  switch (state) {
    case states.SUCCESS:
      return updateStatus.SUCCESS
    case states.ERROR:
      return updateStatus.FAILURE
    case states.FETCHING:
      return updateStatus.UPDATING
    default:
      return updateStatus.NOT_SET
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

  let libraryState = (settings && settings[KIND.homeLibrary]) ? settings[KIND.homeLibrary].state : null

  return {
    homeIndex: homeIndex,
    alephId: personal.user ? personal.user.alephId : null,
    userState: personal.user ? personal.user.state : null,
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
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
  setHomeLibrary: PropTypes.func,
  homeIndex: PropTypes.number,
  setCircStatus: PropTypes.func,
  getCircStatus: PropTypes.func,
  alephId: PropTypes.string,
  libraryStatus: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
