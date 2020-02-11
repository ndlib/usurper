import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import typy from 'typy'

import getToken from 'actions/personal/token'
import { getAllFavorites, KIND as FAVE_KIND } from 'actions/personal/favorites'
import {
  getHomeLibrary,
  getHideHomeFavorites,
  DEFAULT_LIBRARY,
  KIND as SETTING_KIND,
} from 'actions/personal/settings'
import { fetchPage } from 'actions/contentful/page'

import Presenter from './presenter'

import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

import Config from 'shared/Configuration'

class TopSection extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)
  }

  // eslint-disable-next-line complexity
  checkFullyLoaded () {
    if (!Config.features.favoritesEnabled) {
      return
    }

    if (!this.props.login || this.props.login.state === statuses.NOT_FETCHED) {
      this.props.getToken()
    }
    if (this.props.login && this.props.login.token) {
      if (this.props.hideFavoritesPref.state === statuses.NOT_FETCHED) {
        this.props.getHideHomeFavorites()
      }
      // Don't bother wasting resources fetching if the user doesn't want favorites displayed anyway
      if (!this.props.hideFavorites && this.props.favoritesStatus === statuses.NOT_FETCHED) {
        this.props.getAllFavorites()
      }
      if (this.props.homeLibraryStatus === statuses.NOT_FETCHED) {
        this.props.getHomeLibrary()
      }
    }
    if (this.props.favoriteLocationSlug && this.props.cfFavoriteLocation.slug !== this.props.favoriteLocationSlug) {
      const preview = (new URLSearchParams(this.props.location.search)).get('preview') === 'true'
      this.props.fetchPage(this.props.favoriteLocationSlug, preview, false, 'page', 3)
    }
  }

  componentDidMount () {
    this.checkFullyLoaded()
  }

  componentDidUpdate () {
    this.checkFullyLoaded()
  }

  render () {
    const showFavorites = Config.features.loginEnabled && Config.features.favoritesEnabled && !this.props.hideFavorites
    const favoritesLoading = [statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.login.state) ||
      this.props.favoritesStatus === statuses.FETCHING
    const locationLoading = [statuses.NOT_FETCHED, statuses.FETCHING].includes(this.props.cfFavoriteLocation.status)

    return (
      <Presenter
        showFavorites={showFavorites}
        favoritesLoading={favoritesLoading}
        locationLoading={locationLoading}
        hasItems={this.props.hasItems}
        locationClassName={this.props.hideFavorites ? 'middle-align' : ''}
        servicePoint={typy(this.props, 'cfFavoriteLocation.json.fields.servicePoint').safeObjectOrEmpty}
        calloutLink={typy(this.props, 'cfFavoriteLocation.json.fields.callOutLink').safeObjectOrEmpty}
        favorites={this.props.favorites}
        cookies={this.props.cookies}
        page={typy(this.props, 'cfFavoriteLocation.json').safeObjectOrEmpty}
      />
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, favorites, settings } = state

  const databaseStatus = favorites[FAVE_KIND.databases].state
  const subjectStatus = favorites[FAVE_KIND.subjects].state
  const combinedStatus = helper.reduceStatuses([databaseStatus, subjectStatus])

  const hasItems = (databaseStatus === statuses.SUCCESS && favorites[FAVE_KIND.databases].items.length > 0) ||
    (subjectStatus === statuses.SUCCESS && favorites[FAVE_KIND.subjects].items.length > 0)

  const loggedIn = !!(personal.login && personal.login.token && personal.login.state === statuses.SUCCESS)
  const hlStatus = settings[SETTING_KIND.homeLibrary].state
  const locationSlug = (() => {
    if (hlStatus === statuses.SUCCESS) {
      return settings[SETTING_KIND.homeLibrary].data
    } else if (hlStatus === statuses.ERROR ||
      ([statuses.ERROR, statuses.SUCCESS, statuses.UNAUTHORIZED, statuses.UNAUTHENTICATED].includes(personal.login.state) && !personal.login.token)) {
      return DEFAULT_LIBRARY
    }
    return null
  })()

  return {
    login: personal.login,
    hideFavorites: (loggedIn && (
      settings[SETTING_KIND.hideHomeFavorites].state !== statuses.SUCCESS || !!settings[SETTING_KIND.hideHomeFavorites].data
    )) || (!loggedIn && (ownProps.hideFavoritesCookie || [statuses.UNAUTHORIZED, statuses.ERROR].includes(personal.login.state))),
    hideFavoritesPref: settings[SETTING_KIND.hideHomeFavorites],
    favoriteLocationSlug: locationSlug,
    favoritesStatus: combinedStatus,
    favorites: favorites,
    hasItems: hasItems,
    cfFavoriteLocation: state.cfPageEntry || { status: statuses.NOT_FETCHED },
    homeLibraryStatus: hlStatus,
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getToken, getAllFavorites, fetchPage, getHomeLibrary, getHideHomeFavorites }, dispatch)
}

TopSection.propTypes = {
  location: PropTypes.object,
  login: PropTypes.object,
  hideFavorites: PropTypes.bool.isRequired,
  hideFavoritesPref: PropTypes.object.isRequired,
  favoriteLocationSlug: PropTypes.string,
  favoritesStatus: PropTypes.string,
  favorites: PropTypes.object,
  hasItems: PropTypes.bool,
  cfFavoriteLocation: PropTypes.object,
  homeLibraryStatus: PropTypes.string,
  getToken: PropTypes.func.isRequired,
  getAllFavorites: PropTypes.func.isRequired,
  fetchPage: PropTypes.func.isRequired,
  getHomeLibrary: PropTypes.func.isRequired,
  getHideHomeFavorites: PropTypes.func.isRequired,
  cookies: PropTypes.any.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopSection)
