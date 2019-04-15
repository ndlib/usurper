import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import getResources from '../../../actions/personal/loanResources'
import * as statuses from '../../../constants/APIStatuses'

import Presenter from './presenter'

class CirculationHistoryContainer extends Component {
  checkLoggedIn (props) {
    if (!props.resources.have.exists && props.loggedIn) {
      props.dispatch(getResources(props.login.token))
    }
  }

  constructor (props) {
    super(props)
    this.checkLoggedIn(props)
  }

  componentDidUpdate (prevProps) {
    if (this.props.loggedIn !== prevProps.loggedIn) {
      this.checkLoggedIn(this.props)
    }
  }

  render () {
    if (!this.props.resources.have) {
      return null
    }

    return <Presenter {...this.props} />
  }
}

const get = (dict, key, defaultVal) => {
  if (!dict || !dict.hasOwnProperty(key)) {
    return defaultVal
  }
  return dict[key]
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, renewal } = state
  const loggedIn = get(personal.login, 'state', '') === statuses.SUCCESS

  const historical = personal.historical

  let checkedOut = []
  if (historical && historical.history) {
    const keys = Object.keys(historical.history)
    checkedOut = Object.values(historical.history).map(function (item, index) {
      item.key = keys[index]
      return item
    })
  }

  const haveFetching = get(historical, 'state', false) === statuses.FETCHING

  return {
    loggedIn: loggedIn,
    login: personal.login,
    alephId: personal.user ? personal.user.alephId : null,
    renewal: renewal,
    resources: {
      have: {
        exists: get(historical, 'state', false),
        loading: haveFetching,
        items: checkedOut,
        emptyText: 'You have no items in your history.',
      },
    },
    optedIn: historical ? historical.saveHistory : false,
    preview: ownProps.location ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true' : false,
  }
}

CirculationHistoryContainer.propTypes = {
  loggedIn: PropTypes.bool,
  resources: PropTypes.object,
}

export default connect(mapStateToProps)(CirculationHistoryContainer)
