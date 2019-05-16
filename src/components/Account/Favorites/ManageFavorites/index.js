import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Presenter from './presenter.js'
import Wizard from '../Wizard'

import { setFavorites, clearUpdateFavorites, KIND } from 'actions/personal/favorites'
import * as statuses from 'constants/APIStatuses'

export class ManageFavoritesContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modified: false,
      saved: false,
      listItems: props.items.sort((a, b) => a.order - b.order),
      wizardOpen: false,
    }
    this.onAddFavorite = this.onAddFavorite.bind(this)
    this.updateList = this.updateList.bind(this)
    this.onSave = this.onSave.bind(this)
    this.openWizard = this.openWizard.bind(this)
    this.closeWizard = this.closeWizard.bind(this)
  }

  static getDerivedStateFromProps (props, state) {
    if (props.saveState === statuses.SUCCESS && !state.saved) {
      return {
        ...state,
        modified: false,
        saved: true,
        listItems: props.items.sort((a, b) => a.order - b.order),
      }
    }

    return null // Lets React know that the state did not change
  }

  onAddFavorite = (kind, key, title, url) => {
    const newList = JSON.parse(JSON.stringify(this.state.listItems))
    newList.push({
      key: key,
      title: title,
      url: url,
    })

    this.updateList(newList)
  }

  updateList = (newList) => {
    const updateState = () => {
      this.setState({
        ...this.state,
        modified: true,
        saved: false,
        listItems: newList,
      })
    }

    if (this.props.saveState !== statuses.NOT_FETCHED) {
      this.props.clearUpdateFavorites(this.props.kind)
      // We need to force the update to happen to clear props.saveState before we set the new list state
      this.forceUpdate(updateState)
    } else {
      updateState()
    }
  }

  onSave = () => {
    // If it hasn't changed or is currently saving, don't try to save again
    if (!this.state.modified || this.props.saveState === statuses.FETCHING) {
      return null
    }

    // The list items have an order attribute when they are fetched, but we aren't updating this as it's
    // being reordered. Do that now based on the array order before sending the update.
    const newList = JSON.parse(JSON.stringify(this.state.listItems))
    for (let i = 0; i < newList.length; i++) {
      newList[i].order = i
    }
    this.props.setFavorites(this.props.kind, newList)
  }

  openWizard () {
    if (this.state.modified) {
      alert('Please save your changes first.')
      return
    }

    // Clear the update state in the store so the wizard doesn't think it is saving
    this.props.clearUpdateFavorites(this.props.kind)

    this.setState({
      wizardOpen: true,
    })
  }

  closeWizard () {
    const newState = {
      wizardOpen: false,
    }

    // If the wizard updated favorites, we need to update the state list
    if (this.props.items !== this.state.listItems) {
      newState.listItems = this.props.items.sort((a, b) => a.order - b.order)
    }

    this.setState(newState)
  }

  render () {
    const message = this.props.items.length
      ? 'Your top four items will be displayed on the home page while you are logged in.'
      : 'You do not have any favorites in this category yet. You can add favorites below.'
    const title = this.props.kind === KIND.databases ? 'Databases' : 'Subjects'
    const updateText = this.props.saveState === statuses.SUCCESS
      ? `Saved ${title} successfully.`
      : `Failed to update ${title} list. Please refresh and try again.`

    return (
      <React.Fragment>
        <Presenter
          saveState={this.props.saveState}
          modified={this.state.modified}
          message={message}
          title={title}
          updateText={updateText}
          kind={this.props.kind}
          favorited={this.state.listItems}
          updateList={this.updateList}
          onAddFavorite={this.onAddFavorite}
          onSave={this.onSave}
          openWizard={this.openWizard}
        />
        { this.state.wizardOpen && (
          <Wizard closeCallback={this.closeWizard} stepList={[this.props.kind]} />
        )}
      </React.Fragment>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { favorites } = state

  let saveState = statuses.NOT_FETCHED
  if (favorites && favorites['update'] && favorites['update'][ownProps.kind]) {
    saveState = favorites['update'][ownProps.kind].state
  }

  return {
    saveState: saveState,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ setFavorites, clearUpdateFavorites }, dispatch)
}

ManageFavoritesContainer.propTypes = {
  kind: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  saveState: PropTypes.string.isRequired,
  setFavorites: PropTypes.func.isRequired,
  clearUpdateFavorites: PropTypes.func.isRequired,
}

const ManageFavorites = connect(mapStateToProps, mapDispatchToProps)(ManageFavoritesContainer)
export default ManageFavorites
