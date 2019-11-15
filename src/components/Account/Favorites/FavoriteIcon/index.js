import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { addFavorite, removeFavorite } from 'actions/personal/favorites'

import bookmark from 'static/images/bookmark.svg'
import bookmarkEmpty from 'static/images/bookmark-empty.svg'
import bookmarkDelete from 'static/images/bookmark-delete.svg'

import * as statuses from 'constants/APIStatuses'

import Config from 'shared/Configuration'

export class FavoriteIconContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isHovered: false,
      queue: [],
      forceIsFavorited: null, // allows for optimistic update of image
    }
    this.mouseEnter = this.mouseEnter.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
    this.mouseClick = this.mouseClick.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    // Use a queue to execute adding or removing favorites.
    // This prevents simultaneous actions overwriting each other, since a single action rewrites the whole list.
    if (this.state.queue.length && ((
      this.props.updateStatus !== prevProps.updateStatus &&
      [statuses.ERROR, statuses.SUCCESS].includes(this.props.updateStatus)
    ) || (
      this.state.queue.length !== prevState.queue.length &&
      this.props.updateStatus !== statuses.FETCHING
    ))
    ) {
      this.state.queue[0]() // Execute it
      this.state.queue.shift() // Remove it from the queue
    }
  }

  mouseEnter () {
    if (this.props.disabled) {
      return
    }

    this.setState({
      isHovered: true,
    })
  }

  mouseLeave () {
    this.setState({
      isHovered: false,
    })
  }

  mouseClick () {
    if (this.props.disabled) {
      return
    }

    const addToQueue = []
    for (let i = 0; i < this.props.data.length; i++) {
      const key = this.props.data[i].itemKey
      const title = this.props.data[i].title
      const url = this.props.data[i].url
      if (this.props.isFavorited) {
        // Delete each link attached to this item
        addToQueue.push(() => this.props.removeFavorite(this.props.kind, key))
      } else {
        // Favorite each link attached to this item
        addToQueue.push(() => this.props.addFavorite(this.props.kind, key, title, url))
      }
    }

    this.setState({
      queue: this.state.queue.concat(addToQueue),
      forceIsFavorited: !this.props.isFavorited,
    })
  }

  render () {
    if (!Config.features.favoritesEnabled || !this.props.isLoggedIn) {
      return null
    }

    let image, hoverText, classes
    if (this.state.forceIsFavorited || this.props.isFavorited) {
      image = this.state.isHovered ? bookmarkDelete : bookmark
      hoverText = 'Remove item from Favorites'
      classes = 'remove-favorite'
    } else {
      image = this.state.isHovered ? bookmark : bookmarkEmpty
      hoverText = 'Add item to Favorites'
      classes = 'add-favorite'
    }

    return (
      <span
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onFocus={this.mouseEnter}
        onBlur={this.mouseLeave}
        onClick={this.mouseClick}
        className={'favorite-action ' + classes}
        title={hoverText}
        tabIndex={0}
        disabled={this.props.disabled}
      >
        <img src={image} alt='' className={'favorite ' + classes} />
      </span>
    )
  }
}

export const mapStateToProps = (state, ownProps) => {
  const { personal, favorites } = state

  return {
    isLoggedIn: !!(personal.login && personal.login.token),
    updateStatus: favorites.update[ownProps.kind].state,
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const addFunc = ownProps.addFavorite || bindActionCreators({ addFavorite }, dispatch).addFavorite
  const removeFunc = ownProps.removeFavorite || bindActionCreators({ removeFavorite }, dispatch).removeFavorite
  return {
    addFavorite: addFunc,
    removeFavorite: removeFunc,
  }
}

FavoriteIconContainer.propTypes = {
  isFavorited: PropTypes.bool,
  disabled: PropTypes.bool,
  kind: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    itemKey: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  })),
  addFavorite: PropTypes.func,
  removeFavorite: PropTypes.func,
  isLoggedIn: PropTypes.bool.isRequired,
  updateStatus: PropTypes.string,
}

const FavoriteIcon = connect(mapStateToProps, mapDispatchToProps)(FavoriteIconContainer)
export default FavoriteIcon
