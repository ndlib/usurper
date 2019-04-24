import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import getResources from 'actions/personal/loanResources'
import * as statuses from 'constants/APIStatuses'

import Resources from './presenter'

class ResourceContainer extends Component {
  checkLoggedIn (props) {
    if ((!props.resources.have.exists ||
      !props.resources.pending.exists) &&
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
  const { personal, renewal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS

  const alephHaveNdu = personal.alephHaveNdu
  const alephHaveHcc = personal.alephHaveHcc
  const alephPendingNdu = personal.alephPendingNdu
  const alephPendingHcc = personal.alephPendingHcc
  const illHave = personal.illHave
  const illPending = personal.illPending
  const user = personal.user

  const checkedOut = get(alephHaveNdu, 'checkedOut', [])
    .concat(get(alephHaveHcc, 'checkedOut', []))
    .concat(get(illHave, 'checkedOut', []))
  const pendingItems = get(alephPendingNdu, 'pending', [])
    .concat(get(alephPendingHcc, 'pending', []))
    .concat(get(illPending, 'pending', []))

  const haveFetching = (get(alephHaveNdu, 'state', false) === statuses.FETCHING ||
                        get(alephHaveHcc, 'state', false) === statuses.FETCHING ||
                        get(illHave, 'state', false) === statuses.FETCHING)

  const pendingFetching = (get(alephPendingNdu, 'state', false) === statuses.FETCHING ||
                          get(alephPendingHcc, 'state', false) === statuses.FETCHING ||
                          get(illPending, 'state', false) === statuses.FETCHING)

  const userFetching = get(user, 'state', false) === statuses.FETCHING

  let canRenew = false
  let expired = false
  if (user && get(user, 'state', false) === statuses.SUCCESS) {
    const dateString = String(user.expiryDate)
    const date = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8))
    expired = date <= new Date()
    canRenew = !expired
  }

  return {
    loggedIn: loggedIn,
    login: personal.login,
    alephId: personal.user ? personal.user.alephId : null,
    renewal: renewal,
    canRenew: canRenew,
    expired: expired,
    userLoading: userFetching,
    resources: {
      have: {
        exists: get(alephHaveNdu, 'state', false) &&
          get(alephHaveHcc, 'state', false) &&
          get(illHave, 'state', false),
        loading: haveFetching,
        items: checkedOut,
        emptyText: 'You have no Checked Out Items',
      },
      pending: {
        exists: get(alephPendingNdu, 'state', false) &&
          get(alephPendingHcc, 'state', false) &&
          get(illPending, 'state', false),
        loading: pendingFetching,
        items: pendingItems,
        emptyText: 'You have no Pending Items',
      },
    },
  }
}

ResourceContainer.propTypes = {
  resources: PropTypes.shape({
    have: PropTypes.object,
    pending: PropTypes.object,
  }),
}

export default connect(mapStateToProps)(ResourceContainer)
