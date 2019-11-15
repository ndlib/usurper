import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import Loading from 'components/Messages/Loading'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

import getToken from 'actions/personal/token'
import {
  getAllFavorites,
  clearUpdateFavorites,
  clearAllFavorites,
  KIND as FAVORITES_KIND,
} from 'actions/personal/favorites'
import {
  getHomeLibrary,
  getHideHomeFavorites,
  getDefaultSearch,
  clearUpdateSettings,
  KIND as SETTINGS_KIND,
  DEFAULT_LIBRARY,
} from 'actions/personal/settings'
import { fetchBranches } from 'actions/contentful/branches'
import { DEFAULT as DEFAULT_DEFAULT_SEARCH } from 'constants/searchOptions.js'

class FavoritesContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
    this.clearAll = this.clearAll.bind(this)

    // Clear the update status in the store in case it was leftover from a previous action
    const clearConditions = [
      { status: props.dbFavorites.state, type: FAVORITES_KIND.databases, action: props.clearUpdateFavorites },
      { status: props.subjectFavorites.state, type: FAVORITES_KIND.subjects, action: props.clearUpdateFavorites },
      { status: props.libraryUpdateStatus, type: SETTINGS_KIND.homeLibrary, action: props.clearUpdateSettings },
      { status: props.hideFavoritesState, type: SETTINGS_KIND.hideHomeFavorites, action: props.clearUpdateSettings },
      { status: props.defaultSearchState, type: SETTINGS_KIND.defaultSearch, action: props.clearUpdateSettings },
      { status: props.circStatus, type: SETTINGS_KIND.circStatus, action: props.clearUpdateSettings },
    ]
    clearConditions.forEach(condition => {
      if (condition.status !== statuses.NOT_FETCHED) {
        condition.action(condition.type)
      }
    })
  }

  checkFullyLoaded () {
    if (this.props.login.state !== statuses.NOT_FETCHED && this.props.login.redirectUrl) {
      window.location.replace(this.props.login.redirectUrl)
    }

    const fetchConditions = [
      { status: this.props.login.state, requiresLogin: false, action: this.props.getToken },
      { status: this.props.favoritesStatus, requiresLogin: true, action: this.props.getAllFavorites },
      { status: this.props.libraryStatus, requiresLogin: true, action: this.props.getHomeLibrary },
      { status: this.props.hideFavoritesState, requiresLogin: true, action: this.props.getHideHomeFavorites },
      { status: this.props.defaultSearchState, requiresLogin: true, action: this.props.getDefaultSearch },
      { status: this.props.cfBranches.status, requiresLogin: false, action: this.props.fetchBranches },
    ]
    fetchConditions.forEach(condition => {
      if (condition.status === statuses.NOT_FETCHED && (!condition.requiresLogin || this.props.loggedIn)) {
        condition.action()
      }
    })
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  clearAll () {
    this.props.clearAllFavorites()
  }

  render () {
    if (this.props.loggedIn && !this.props.loading) {
      return (
        <Presenter
          {...this.props}
          homeLibraries={helper.sortList(this.props.cfBranches.data, 'fields.alternateTitle', 'asc')}
          clearAll={this.clearAll}
        />
      )
    } else {
      return <Loading message='Loading Favorites' />
    }
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, favorites, settings } = state

  const combinedStatus = helper.reduceStatuses(Object.values(FAVORITES_KIND).map((key) => favorites[key].state))
  const libraryState = settings[SETTINGS_KIND.homeLibrary].state
  const preferredLocationSlug = libraryState === statuses.SUCCESS ? settings[SETTINGS_KIND.homeLibrary].data : DEFAULT_LIBRARY
  const loadingHomePageDisplay = [statuses.NOT_FETCHED, statuses.FETCHING].includes(settings[SETTINGS_KIND.hideHomeFavorites].state) ||
    [statuses.NOT_FETCHED, statuses.FETCHING].includes(settings[SETTINGS_KIND.defaultSearch].state)

  return {
    login: personal.login,
    loggedIn: !!(personal.login && personal.login.token),
    preview: (ownProps && ownProps.location && ownProps.location.search)
      ? (new URLSearchParams(ownProps.location.search)).get('preview') === 'true'
      : false,
    loading: !personal.login || personal.login.state === statuses.FETCHING,
    dbFavorites: favorites[FAVORITES_KIND.databases],
    subjectFavorites: favorites[FAVORITES_KIND.subjects],
    favoritesStatus: combinedStatus,
    selectedLocation: preferredLocationSlug,
    libraryStatus: libraryState,
    libraryUpdateStatus: settings['update'][SETTINGS_KIND.homeLibrary].state,
    cfBranches: state.cfBranches,
    hideFavorites: [true, 'true'].includes(settings[SETTINGS_KIND.hideHomeFavorites].data),
    hideFavoritesState: settings[SETTINGS_KIND.hideHomeFavorites].state,
    homePageDisplayLoading: loadingHomePageDisplay,
    defaultSearch: settings[SETTINGS_KIND.defaultSearch].data || DEFAULT_DEFAULT_SEARCH,
    defaultSearchState: settings[SETTINGS_KIND.defaultSearch].state,
    saveHistory: settings[SETTINGS_KIND.circStatus].state,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getToken,
    getAllFavorites,
    clearUpdateFavorites,
    clearAllFavorites,
    getHomeLibrary,
    fetchBranches,
    getHideHomeFavorites,
    getDefaultSearch,
    clearUpdateSettings,
  }, dispatch)
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
  selectedLocation: PropTypes.string,
  libraryStatus: PropTypes.string,
  libraryUpdateStatus: PropTypes.string,
  cfBranches: PropTypes.object,
  hideFavorites: PropTypes.bool.isRequired,
  hideFavoritesState: PropTypes.string.isRequired,
  cookies: PropTypes.any,
  homePageDisplayLoading: PropTypes.bool.isRequired,
  defaultSearch: PropTypes.string.isRequired,
  defaultSearchState: PropTypes.string.isRequired,
  saveHistory: PropTypes.string.isRequired,
  // action creators
  getToken: PropTypes.func.isRequired,
  getAllFavorites: PropTypes.func.isRequired,
  clearUpdateFavorites: PropTypes.func.isRequired,
  clearAllFavorites: PropTypes.func.isRequired,
  getHomeLibrary: PropTypes.func.isRequired,
  fetchBranches: PropTypes.func,
  getHideHomeFavorites: PropTypes.func.isRequired,
  getDefaultSearch: PropTypes.func,
  clearUpdateSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
