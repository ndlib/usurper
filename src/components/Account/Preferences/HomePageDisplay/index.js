import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import HideHomeFavorites from './HideHomeFavorites'
import DefaultSearch from './DefaultSearch'

import { setHideHomeFavorites, setDefaultSearch, clearUpdateSettings, KIND } from 'actions/personal/settings'
import { saveSearchPreference } from 'actions/search'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import { HIDE_HOME_FAVORITES, cookieOptions } from 'constants/cookies'
import { searchOptions } from 'constants/searchOptions.js'

export class HomePageDisplayContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hideHomeFavoritesCheckbox: props.hideFavorites,
      defaultSearch: props.defaultSearch,
    }

    this.onChange = this.onChange.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.statusText = this.statusText.bind(this)
  }

  componentDidUpdate (prevProps) {
    // This is needed to reset the state after props change. (I.e. after clearing favorites)
    if (this.props.defaultSearch !== prevProps.defaultSearch) {
      this.onSearchChange(this.props.defaultSearch)
    }
    if (this.props.hideFavorites !== prevProps.hideFavorites) {
      this.onChange({
        target: {
          name: 'hideHomeFavoritesCheckbox',
          type: 'checkbox',
          checked: this.props.hideFavorites,
        },
      })
    }
  }

  onChange = (event) => {
    // Note that all form inputs should have a name property that matches the name in the state
    const stateObj = {}
    stateObj[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState(stateObj)

    if ([statuses.SUCCESS, statuses.ERROR].includes(this.props.saveState)) {
      this.props.clearUpdateSettings(KIND.hideHomeFavorites)
      this.props.clearUpdateSettings(KIND.defaultSearch)
    }
  }

  onSearchChange = (value) => {
    this.onChange({
      target: {
        name: 'defaultSearch',
        value: value,
      },
    })
  }

  onSave = (event) => {
    event.preventDefault()
    if (this.props.saveState === statuses.FETCHING) {
      return null
    }

    this.props.setHideHomeFavorites(this.state.hideHomeFavoritesCheckbox)
    this.props.setDefaultSearch(this.state.defaultSearch)
    this.props.saveSearchPreference(searchOptions.find((x) => x.uid === this.state.defaultSearch))

    if (this.state.hideHomeFavoritesCheckbox) {
      this.props.cookies.set(HIDE_HOME_FAVORITES, true, cookieOptions(HIDE_HOME_FAVORITES))
    } else {
      this.props.cookies.remove(HIDE_HOME_FAVORITES, cookieOptions(HIDE_HOME_FAVORITES))
    }
  }

  statusText () {
    switch (this.props.saveState) {
      case statuses.SUCCESS:
        return 'Saved home page settings successfully.'
      case statuses.ERROR:
        return 'Failed to update home page settings. Please refresh and try again.'
      default:
        return null
    }
  }

  render () {
    const saving = this.props.saveState === statuses.FETCHING
    return (
      <section className='group home-page-display' id='homePageDisplay'>
        <h3>Home Page Display</h3>
        <div className='section-box pad-edges'>
          <form onSubmit={this.onSave}>
            <HideHomeFavorites onChange={this.onChange} defaultChecked={this.props.hideFavorites} key={this.props.hideFavorites} />
            <DefaultSearch onChange={this.onSearchChange} defaultValue={this.props.defaultSearch} key={this.props.defaultSearch} />
            <button type='submit' className='right' aria-label='Save' disabled={saving}>Save</button>
            { saving ? (
              <InlineLoading title='Saving...' className='fright pad-edges-sm' />
            ) : (
              <UpdateStatus className='pad-edges-md' status={this.props.saveState} text={this.statusText()} />
            )}
          </form>
        </div>
      </section>
    )
  }
}

export const mapStateToProps = (state) => {
  const { settings } = state

  return {
    saveState: helper.reduceStatuses([
      settings['update'][KIND.hideHomeFavorites].state,
      settings['update'][KIND.defaultSearch].state,
    ]),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setHideHomeFavorites,
    setDefaultSearch,
    saveSearchPreference,
    clearUpdateSettings,
  }, dispatch)
}

HomePageDisplayContainer.propTypes = {
  hideFavorites: PropTypes.bool.isRequired,
  saveState: PropTypes.string.isRequired,
  setHideHomeFavorites: PropTypes.func.isRequired,
  cookies: PropTypes.any.isRequired,
  defaultSearch: PropTypes.string.isRequired,
  setDefaultSearch: PropTypes.func.isRequired,
  saveSearchPreference: PropTypes.func.isRequired,
  clearUpdateSettings: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePageDisplayContainer)
