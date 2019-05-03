import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import getResources, { getUser } from 'actions/personal/loanResources'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

class ItemsRequestsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    if (this.props.loggedIn) {
      if (this.props.userStatus === statuses.NOT_FETCHED) {
        this.props.getUser()
      }
      // Doesn't depend on alephId so we can fetch these simultaneously
      if (this.props.resources.have.needToFetch || this.props.resources.pending.needToFetch) {
        this.props.getResources()
      }
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    return <Presenter {...this.props} />
  }
}

const combineState = (inArr) => {
  const outObj = {
    items: [],
    loading: false,
    needToFetch: false,
  }

  inArr.forEach((type) => {
    if (type.state === statuses.FETCHING) {
      outObj.loading = true
    } else if ([statuses.NOT_FETCHED, statuses.ERROR].includes(type.state)) {
      outObj.needToFetch = true
    }
    if (type.items) {
      outObj.items.push(...type.items)
    }
  })

  return outObj
}

export const mapStateToProps = (state) => {
  const { personal } = state

  const have = combineState([ personal.alephHaveNdu, personal.alephHaveHcc, personal.illHave ])
  const pending = combineState([ personal.alephPendingNdu, personal.alephPendingHcc, personal.illPending ])
  const userFetching = [statuses.NOT_FETCHED, statuses.FETCHING].includes(personal.user.state)

  let expired = false
  if (personal.user.state === statuses.SUCCESS) {
    const dateString = String(personal.user.expiryDate)
    const date = new Date(dateString.substring(0, 4), dateString.substring(4, 6) - 1, dateString.substring(6, 8))
    expired = date <= new Date()
  }

  return {
    loggedIn: !!(personal.login && personal.login.token),
    login: personal.login,
    userLoading: userFetching,
    userStatus: personal.user.state,
    userExpired: expired,
    balance: personal.user.balance || 0,
    resources: {
      have: have,
      pending: pending,
    },
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getResources, getUser }, dispatch)
}

ItemsRequestsContainer.propTypes = {
  loggedIn: PropTypes.bool,
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
    redirectUrl: PropTypes.string,
  }),
  userLoading: PropTypes.bool,
  userStatus: PropTypes.string,
  userExpired: PropTypes.bool,
  balance: PropTypes.number,
  resources: PropTypes.shape({
    have: PropTypes.shape({
      items: PropTypes.array,
      loading: PropTypes.bool,
      needToFetch: PropTypes.bool,
    }),
    pending: PropTypes.shape({
      items: PropTypes.array,
      loading: PropTypes.bool,
      needToFetch: PropTypes.bool,
    }),
  }),
  getUser: PropTypes.func.isRequired,
  getResources: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsRequestsContainer)
