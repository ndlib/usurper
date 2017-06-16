import React, { Component } from 'react'
import { connect } from 'react-redux'
import getToken from '../../../actions/personal/token'
import Presenter from './presenter'
import * as states from '../../../constants/APIStatuses'

class AccountLink extends Component {
  componentWillMount () {
    if (!this.props.login) {
      this.props.dispatch(getToken())
    }
  }

  render () {
    return <Presenter {...this.props} />
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal } = state

  return {
    login: personal.login,
    buttonUrl: personal.login ? personal.login.buttonUrl : '',
    ...ownProps,
  }
}

export default connect(mapStateToProps)(AccountLink)
