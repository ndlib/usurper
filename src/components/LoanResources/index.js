'use strict'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import getResources from '../../actions/personal/loanResources'
import * as statuses from '../../constants/APIStatuses'

import Resources from './presenter'

class ResourceContainer extends Component {
  checkLoggedIn (props) {
    if (!props.resources.have.state &&
      !props.resources.pending.state &&
      props.loggedIn) {
      props.dispatch(getResources(props.login.token))
    }
  }

  componentWillMount () {
    this.checkLoggedIn(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.checkLoggedIn(nextProps)
  }

  render () {
    if (!this.props.resources.have && !this.props.resources.pending) {
      return <div />
    }

    return <Resources {...this.props} />
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

  const have = personal.resources_have
  const pending = personal.resources_pending

  const web = get(have, 'web', [])
  const checkedOut = get(have, 'checkedOut', [])
  const pendingItems = get(pending, 'pending', [])

  return {
    loggedIn: loggedIn,
    login: personal.login,
    user: personal.user,
    renewal: personal.renewal,
    resources: {
      have: {
        state: get(have, 'state', false),
        loading: get(have, 'state', false) === statuses.FETCHING,
        items: web.concat(checkedOut),
        emptyText: 'You have no Checked Out Items',
      },
      pending: {
        state: get(pending, 'state', false),
        loading: get(pending, 'state', false) === statuses.FETCHING,
        items: pendingItems,
        emptyText: 'You have no Pending Items',
      },
    },
  }
}

export default connect(mapStateToProps)(ResourceContainer)
