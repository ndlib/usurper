import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import Loading from 'components/Messages/Loading'

import * as statuses from 'constants/APIStatuses'

import getToken from 'actions/personal/token'
import { getAllFavorites, clearUpdateFavorites, KIND } from 'actions/personal/favorites'

class FavoritesContainer extends Component {
  constructor (props) {
    super(props)

    // Clear the update status in the store in case it was leftover from a previous action
    if (props.dbFavorites.state !== statuses.NOT_FETCHED) {
      props.clearUpdateFavorites(KIND.databases)
    }
    if (props.subjectFavorites.state !== statuses.NOT_FETCHED) {
      props.clearUpdateFavorites(KIND.subjects)
    }
  }

  checkFullyLoaded () {
    if (this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    } else if (this.props.login.redirectUrl) {
      window.location.replace(this.props.login.redirectUrl)
    }
    if (this.props.loggedIn && this.props.favoritesStatus === statuses.NOT_FETCHED) {
      this.props.getAllFavorites()
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    if (this.props.loggedIn && !this.props.loading) {
      return <Presenter preview={this.props.preview}
        dbFavorites={this.props.dbFavorites}
        subjectFavorites={this.props.subjectFavorites}
        favoritesStatus={this.props.favoritesStatus}
      />
    } else {
      return <Loading message='Loading Favorites' />
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, favorites } = state

  const databaseStatus = favorites[KIND.databases] ? favorites[KIND.databases].state : statuses.NOT_FETCHED
  const subjectStatus = favorites[KIND.subjects] ? favorites[KIND.subjects].state : statuses.NOT_FETCHED
  let combinedStatus = statuses.NOT_FETCHED
  if (databaseStatus === subjectStatus) {
    combinedStatus = databaseStatus
  } else if (databaseStatus === statuses.ERROR || subjectStatus === statuses.ERROR) {
    combinedStatus = statuses.ERROR
  } else if (databaseStatus === statuses.NOT_FETCHED || subjectStatus === statuses.NOT_FETCHED) {
    // If either one is not fetched, mark as such so that we will know to start fetching
    combinedStatus = statuses.NOT_FETCHED
  } else {
    // Either one is still fetching while the other is SUCCESS... Mark as in progress
    combinedStatus = statuses.FETCHING
  }

  return {
    login: personal.login,
    loggedIn: !!(personal.login && personal.login.token),
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
    loading: !personal.login || personal.login.state === statuses.FETCHING,
    dbFavorites: favorites[KIND.databases],
    subjectFavorites: favorites[KIND.subjects],
    favoritesStatus: combinedStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken, getAllFavorites, clearUpdateFavorites }, dispatch)
}

FavoritesContainer.propTypes = {
  login: PropTypes.shape({
    state: PropTypes.string,
    redirectUrl: PropTypes.string,
  }),
  loggedIn: PropTypes.bool,
  preview: PropTypes.bool,
  loading: PropTypes.bool,
  dbFavorites: PropTypes.shape({
    state: PropTypes.string,
  }),
  subjectFavorites: PropTypes.shape({
    state: PropTypes.string,
  }),
  favoritesStatus: PropTypes.string.isRequired,
  getToken: PropTypes.func.isRequired,
  getAllFavorites: PropTypes.func.isRequired,
  clearUpdateFavorites: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
