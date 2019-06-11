import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import Loading from 'components/Messages/Loading'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

import getToken from 'actions/personal/token'
import { getAllFavorites, clearUpdateFavorites, KIND as FAVORITES_KIND } from 'actions/personal/favorites'
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

    // Clear the update status in the store in case it was leftover from a previous action
    if (props.dbFavorites.state !== statuses.NOT_FETCHED) {
      props.clearUpdateFavorites(FAVORITES_KIND.databases)
    }
    if (props.subjectFavorites.state !== statuses.NOT_FETCHED) {
      props.clearUpdateFavorites(FAVORITES_KIND.subjects)
    }
    if (props.libraryUpdateStatus !== statuses.NOT_FETCHED) {
      props.clearUpdateSettings(SETTINGS_KIND.homeLibrary)
    }
    if (props.hideFavoritesState !== statuses.NOT_FETCHED) {
      props.clearUpdateSettings(SETTINGS_KIND.hideHomeFavorites)
    }
    if (props.defaultSearchState !== statuses.NOT_FETCHED) {
      props.clearUpdateSettings(SETTINGS_KIND.defaultSearch)
    }
    if (props.circStatus !== statuses.NOT_FETCHED) {
      props.clearUpdateSettings(SETTINGS_KIND.circStatus)
    }
  }

  checkFullyLoaded () {
    if (this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    } else if (this.props.login.redirectUrl) {
      window.location.replace(this.props.login.redirectUrl)
    }
    if (this.props.loggedIn) {
      if (this.props.favoritesStatus === statuses.NOT_FETCHED) {
        this.props.getAllFavorites()
      }
      if (this.props.libraryStatus === statuses.NOT_FETCHED) {
        this.props.getHomeLibrary()
      }
      if (this.props.hideFavoritesState === statuses.NOT_FETCHED) {
        this.props.getHideHomeFavorites()
      }
      if (this.props.defaultSearchState === statuses.NOT_FETCHED) {
        this.props.getDefaultSearch()
      }
    }
    if (!this.props.cfBranches || this.props.cfBranches.status === statuses.NOT_FETCHED) {
      this.props.fetchBranches()
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
      return (
        <Presenter
          {...this.props}
          homeLibraries={helper.sortList(this.props.cfBranches.data, 'fields.alternateTitle', 'asc')}
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
    // eslint-disable-next-line eqeqeq
    hideFavorites: settings[SETTINGS_KIND.hideHomeFavorites].data == 'true',
    hideFavoritesState: settings[SETTINGS_KIND.hideHomeFavorites].state,
    homePageDisplayLoading: loadingHomePageDisplay,
    defaultSearch: settings[SETTINGS_KIND.defaultSearch].data || DEFAULT_DEFAULT_SEARCH,
    defaultSearchState: settings[SETTINGS_KIND.defaultSearch].state,
    circStatus: settings[SETTINGS_KIND.circStatus].state,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getToken,
    getAllFavorites,
    clearUpdateFavorites,
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
  circStatus: PropTypes.string.isRequired,
  // action creators
  getToken: PropTypes.func.isRequired,
  getAllFavorites: PropTypes.func.isRequired,
  clearUpdateFavorites: PropTypes.func.isRequired,
  getHomeLibrary: PropTypes.func.isRequired,
  fetchBranches: PropTypes.func,
  getHideHomeFavorites: PropTypes.func.isRequired,
  getDefaultSearch: PropTypes.func,
  clearUpdateSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer)
