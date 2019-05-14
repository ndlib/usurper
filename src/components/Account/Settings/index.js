import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Presenter from './presenter'
import {
  getHomeLibrary,
  getHideHomeFavorites,
  getDefaultSearch,
  clearUpdateSettings,
  KIND,
  DEFAULT_LIBRARY,
} from 'actions/personal/settings'
import { fetchBranches } from 'actions/contentful/branches'

import * as states from 'constants/APIStatuses'
import { DEFAULT as DEFAULT_DEFAULT_SEARCH } from 'constants/searchOptions.js'

class SettingsContainer extends Component {
  constructor (props) {
    super(props)
    this.checkFullyLoaded = this.checkFullyLoaded.bind(this)

    // Clear the update status in the store in case it was leftover from a previous action
    if (props.libraryUpdateStatus !== states.NOT_FETCHED) {
      props.clearUpdateSettings(KIND.homeLibrary)
    }
    if (props.hideFavoritesState !== states.NOT_FETCHED) {
      props.clearUpdateSettings(KIND.hideHomeFavorites)
    }
    if (props.defaultSearchState !== states.NOT_FETCHED) {
      props.clearUpdateSettings(KIND.defaultSearch)
    }
    if (props.circStatus !== states.NOT_FETCHED) {
      props.clearUpdateSettings(KIND.circStatus)
    }
  }

  // eslint-disable-next-line complexity
  checkFullyLoaded () {
    if (this.props.loggedIn) {
      if (this.props.libraryStatus === states.NOT_FETCHED) {
        this.props.getHomeLibrary()
      }
      if (this.props.hideFavoritesState === states.NOT_FETCHED) {
        this.props.getHideHomeFavorites()
      }
      if (this.props.defaultSearchState === states.NOT_FETCHED) {
        this.props.getDefaultSearch()
      }
    }
    if (!this.props.cfBranches || this.props.cfBranches.status === states.NOT_FETCHED) {
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
    return <Presenter
      homeLibraries={this.props.cfBranches.data
        ? this.props.cfBranches.data.sort((a, b) => {
          const titleA = a.fields.alternateTitle || a.fields.title
          const titleB = b.fields.alternateTitle || b.fields.title
          if (titleA === titleB) {
            return 0
          } else {
            return titleA > titleB ? 1 : -1
          }
        })
        : null}
      selectedLocation={this.props.selectedLocation}
      libraryStatus={this.props.libraryStatus}
      libraryUpdateStatus={this.props.libraryUpdateStatus}
      hideFavorites={this.props.hideFavorites}
      homePageDisplayLoading={this.props.homePageDisplayLoading}
      cookies={this.props.cookies}
      defaultSearch={this.props.defaultSearch}
    />
  }
}

export const mapStateToProps = (state) => {
  const { personal, settings } = state

  const libraryState = settings[KIND.homeLibrary].state
  const preferredLocationSlug = libraryState === states.SUCCESS ? settings[KIND.homeLibrary].data : DEFAULT_LIBRARY
  const loadingHomePageDisplay = [states.NOT_FETCHED, states.FETCHING].includes(settings[KIND.hideHomeFavorites].state) ||
    [states.NOT_FETCHED, states.FETCHING].includes(settings[KIND.defaultSearch].state)

  return {
    selectedLocation: preferredLocationSlug,
    loggedIn: !!(personal.login && personal.login.token),
    libraryStatus: libraryState,
    libraryUpdateStatus: settings['update'][KIND.homeLibrary].state,
    cfBranches: state.cfBranches,
    // eslint-disable-next-line eqeqeq
    hideFavorites: settings[KIND.hideHomeFavorites].data == 'true',
    hideFavoritesState: settings[KIND.hideHomeFavorites].state,
    homePageDisplayLoading: loadingHomePageDisplay,
    defaultSearch: settings[KIND.defaultSearch].data || DEFAULT_DEFAULT_SEARCH,
    defaultSearchState: settings[KIND.defaultSearch].state,
    circStatus: settings[KIND.circStatus].state,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getHomeLibrary,
    fetchBranches,
    getHideHomeFavorites,
    getDefaultSearch,
    clearUpdateSettings,
  }, dispatch)
}

SettingsContainer.propTypes = {
  loggedIn: PropTypes.bool,
  getHomeLibrary: PropTypes.func.isRequired,
  selectedLocation: PropTypes.string,
  fetchBranches: PropTypes.func,
  libraryStatus: PropTypes.string,
  libraryUpdateStatus: PropTypes.string,
  cfBranches: PropTypes.object,
  getHideHomeFavorites: PropTypes.func.isRequired,
  getDefaultSearch: PropTypes.func,
  hideFavorites: PropTypes.bool.isRequired,
  hideFavoritesState: PropTypes.string.isRequired,
  cookies: PropTypes.any,
  homePageDisplayLoading: PropTypes.bool.isRequired,
  defaultSearch: PropTypes.string.isRequired,
  defaultSearchState: PropTypes.string.isRequired,
  circStatus: PropTypes.string.isRequired,
  clearUpdateSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer)
