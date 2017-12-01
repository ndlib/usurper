import React, { Component } from 'react'
import PropTypes from 'prop-types'

const SCROLLED = true
const NOTSCROLLED = false
const DEFAULT_OFFSET = 245
const MENU_OPEN_OFFSET = 390
const ADVANCED_MENU_OFFSET = 578

class SideNavPresenter extends Component {
  constructor (props) {
    super(props)
    this.scrolledStyle = this.scrolledStyle.bind(this)
    this.listenScrollEvent = this.listenScrollEvent.bind(this)
    this.state = {
      isScrolled: NOTSCROLLED,
      offsetHeight: DEFAULT_OFFSET,
    }
  }
  componentDidMount () {
    window.addEventListener('scroll', this.listenScrollEvent)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.listenScrollEvent)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.search !== this.props.search) {
      let currentOffset = DEFAULT_OFFSET
      if (nextProps.search.drawerOpen) {
        currentOffset = MENU_OPEN_OFFSET
        if (nextProps.search.advancedSearch) {
          currentOffset = ADVANCED_MENU_OFFSET
        }
      }
      this.setState({ offsetHeight: currentOffset })
    }
  }

  listenScrollEvent () {
    if (window.pageYOffset > this.state.offsetHeight && this.state.isScrolled === NOTSCROLLED) {
      this.setState({
        isScrolled: SCROLLED,
      })
    }
    if (window.pageYOffset <= this.state.offsetHeight && this.state.isScrolled === SCROLLED) {
      this.setState({ isScrolled: NOTSCROLLED })
    }
  }

  scrolledStyle () {
    if (this.state.isScrolled === SCROLLED) {
      return {
        position: 'fixed',
        top: '10px',
      }
    }
    return {
      position: 'absolute',
    }
  }

  render () {
    return (
      <div
        className={'side-nav' + (this.props.className ? ' ' + this.props.className : '')}
        onScroll={this.listenScrollEvent}
        style={this.scrolledStyle()}
      >{this.props.children}</div>
    )
  }
}

SideNavPresenter.propTypes = {
  children: PropTypes.any.isRequired,
}

export default SideNavPresenter
