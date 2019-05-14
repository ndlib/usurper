import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import bookmark from 'static/images/bookmark.svg'
import bookmarkAdd from 'static/images/bookmark-plus.svg'
import Link from 'components/Interactive/Link'
import Config from 'shared/Configuration'
import Wizard from '../Wizard'
import { clearUpdateFavorites, KIND as FAVORITES_KIND } from 'actions/personal/favorites'
import { setHideHomeFavorites } from 'actions/personal/settings'
import { HIDE_HOME_FAVORITES, cookieOptions } from 'constants/cookies'

const loginPath = Config.viceroyAPI + '/login'
const settingsPath = '/settings'

export class NoFavoritesContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      wizardOpen: false,
    }

    this.hideFavorites = this.hideFavorites.bind(this)
    this.openWizard = this.openWizard.bind(this)
    this.closeWizard = this.closeWizard.bind(this)
    this.noFavoritesMessage = this.noFavoritesMessage.bind(this)
  }

  hideFavorites () {
    this.props.cookies.set(HIDE_HOME_FAVORITES, true, cookieOptions(HIDE_HOME_FAVORITES))
    // Update the user's setting so it will persist while logged in regardless of cookie
    if (this.props.isLoggedIn) {
      this.props.setHideHomeFavorites(true)
    }
  }

  openWizard () {
    // Clear the update state in the store so the wizard doesn't think it is saving
    for (const kind in FAVORITES_KIND) {
      this.props.clearUpdateFavorites(kind)
    }

    this.setState({
      wizardOpen: true,
    })
  }

  closeWizard () {
    this.setState({
      wizardOpen: false,
    })
  }

  noFavoritesMessage () {
    if (!this.props.isLoggedIn) {
      return (
        <React.Fragment>
          Please <Link to={loginPath} noTarget>log in</Link> to begin selecting favorites. Your top choices
          will be displayed here for easy access. You can hide this message by clicking the "Hide" link above.
        </React.Fragment>
      )
    } else if (this.props.isHomePage) {
      return (
        <React.Fragment>
          Click below to begin selecting favorites. Your top choices will be displayed here for easy access.
          You can disable this message in your <Link to={settingsPath}>account settings</Link>.
        </React.Fragment>
      )
    }

    return `
      Click below to begin selecting favorites. You can modify favorites from this page after making your initial
      selections.
    `
  }

  render () {
    return (
      <React.Fragment>
        <section className='group favorites'>
          <h3>
            <img src={bookmark} alt='' className='favorite white' />Favorites
            {this.props.isHomePage && (
              <span className='fright link-like' onClick={this.hideFavorites}>Hide</span>
            )}
          </h3>
          <div className='section-box'>
            <div className='row'>
              <p><img src={bookmarkAdd} alt='' className='add-favorites' />{this.noFavoritesMessage()}</p>
            </div>
            <button className='center favorites-wizard-open' disabled={!this.props.isLoggedIn} onClick={this.openWizard}>
              Add Favorites
            </button>
          </div>
        </section>
        { this.state.wizardOpen && (
          <Wizard closeCallback={this.closeWizard} />
        )}
      </React.Fragment>
    )
  }
}

NoFavoritesContainer.propTypes = {
  isLoggedIn: PropTypes.bool,
  isHomePage: PropTypes.bool,
  clearUpdateFavorites: PropTypes.func.isRequired,
  setHideHomeFavorites: PropTypes.func.isRequired,
  cookies: PropTypes.any,
}

export const mapStateToProps = (state) => {
  const { personal } = state

  return {
    isLoggedIn: !!(personal.login && personal.login.token),
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearUpdateFavorites, setHideHomeFavorites }, dispatch)
}

const NoFavorites = connect(mapStateToProps, mapDispatchToProps)(NoFavoritesContainer)

export default NoFavorites
