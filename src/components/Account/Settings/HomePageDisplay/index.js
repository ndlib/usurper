import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import RadioList from 'components/Interactive/RadioList'

import { setHideHomeFavorites, setDefaultSearch, clearUpdateSettings, KIND } from 'actions/personal/settings'
import { saveSearchPreference } from 'actions/search'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'
import { HIDE_HOME_FAVORITES, cookieOptions } from 'constants/cookies'
import { searchOptions } from 'constants/searchOptions.js'

import Config from 'shared/Configuration'

class HomePageDisplayContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hideHomeFavoritesCheckbox: props.hideFavorites,
      defaultSearch: props.defaultSearch,
    }

    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onChange = (event) => {
    // Note that all form inputs should have a name property that matches the name in the state
    const stateObj = {}
    stateObj[event.target.name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    this.setState(stateObj)

    if (this.props.saveState === statuses.SUCCESS || this.props.saveState === statuses.ERROR) {
      this.props.clearUpdateSettings(KIND.hideHomeFavorites)
      this.props.clearUpdateSettings(KIND.defaultSearch)
    }
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

  render () {
    const updateText = this.props.saveState === statuses.SUCCESS
      ? `Saved home page settings successfully.`
      : `Failed to update home page settings. Please refresh and try again.`

    return (
      <section className='group home-page-display'>
        <h3>Home Page Display</h3>
        <div className='section-box pad-edges'>
          <form onSubmit={this.onSave}>
            { Config.features.favoritesEnabled && (
              <React.Fragment>
                <h4>Favorites</h4>
                <div className='row'>
                  <div className='col-xs-12'>
                    <label>
                      <input type='checkbox' name='hideHomeFavoritesCheckbox' onChange={this.onChange} defaultChecked={this.props.hideFavorites} />
                      Hide favorites on the home page.
                    </label>
                  </div>
                </div>
                <br />
              </React.Fragment>
            )}
            <h4>Default Search</h4>
            <RadioList
              radioName='defaultSearch'
              entries={searchOptions.map((option) => ({
                title: option.title,
                value: option.uid,
              }))}
              defaultValue={this.state.defaultSearch}
              onChangeCallback={(value) => this.onChange({
                target: {
                  name: 'defaultSearch',
                  value: value,
                },
              })}
            />
            <button type='submit' className='right' aria-label='Save' disabled={!this.props.saveState === statuses.FETCHING}>
              Save
            </button>
            { this.props.saveState === statuses.FETCHING ? (
              <InlineLoading title='Saving...' className='fright pad-edges-sm' />
            ) : (
              <UpdateStatus className='pad-edges-md' status={this.props.saveState} text={updateText} />
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
