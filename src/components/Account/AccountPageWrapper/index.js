import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter'

import getToken from 'actions/personal/token'
import * as statuses from 'constants/APIStatuses'

class AccountPageWrapper extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  checkFullyLoaded () {
    if (this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    } else if (this.props.login.redirectUrl) {
      window.location.replace(this.props.login.redirectUrl)
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    const preview = this.props.location
      ? (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      : false
    return (
      <Presenter
        title={this.props.title}
        slug={this.props.slug}
        className={this.props.className}
        preview={preview}
        loading={this.props.loading}
      >
        {this.props.children}
      </Presenter>
    )
  }
}

export const mapStateToProps = (state) => {
  const { personal } = state

  return {
    login: personal.login,
    loading: [statuses.NOT_FETCHED, statuses.FETCHING].includes(personal.login.state),
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken }, dispatch)
}

AccountPageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.any,
  location: PropTypes.shape({
    search: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
  }),
  login: PropTypes.shape({
    state: PropTypes.string,
    token: PropTypes.string,
    redirectUrl: PropTypes.string,
  }),
  loading: PropTypes.bool,
  getToken: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountPageWrapper)
