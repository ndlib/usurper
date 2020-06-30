import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ChatModal from './presenter.js'
import {
  openChat,
  closeChat,
} from 'actions/chat.js'

// ms on a single page before proactive chat invitation pops up
const PROACTIVE_CHAT_TIMER = 10000

const mapStateToProps = (state, ownProps) => {
  return {
    chatOpen: state.chat.chatOpen,
    // On keydown we open chat page instead of modal for accessibiilty.
    onKeyDown: (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        ownProps.history.push('/chat')
      }
    },
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  const onClick = (e, func) => {
    e.preventDefault()
    if (ownProps.location.pathname === '/chat' || ownProps.location.pathname === '/chat/') {
      return
    }

    // small screen, go to chat page and make sure chat box is closed
    if (window.innerWidth <= 450) {
      ownProps.history.push('/chat')
      dispatch(closeChat())
      return
    }
    dispatch(func())
  }

  return {
    openChat: (e) => {
      onClick(e, openChat)
    },
    closeChat: (e) => {
      onClick(e, closeChat)
    },
  }
}

const mergeProps = (state, dispatchProps, ownProps) => {
  return {
    onClick: state.chatOpen ? dispatchProps.closeChat : dispatchProps.openChat,
    ...state,
    ...dispatchProps,
    ...ownProps,
  }
}

export class ChatModalContainer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showInvite: false,
      proactiveChatTimer: null,
    }
    this.displayInvite = this.displayInvite.bind(this)
    this.closeInvite = this.closeInvite.bind(this)
    this.acceptInvite = this.acceptInvite.bind(this)
  }

  componentDidMount () {
    this.setState({
      proactiveChatTimer: setTimeout(this.displayInvite, PROACTIVE_CHAT_TIMER),
    })
  }

  componentWillUnmount () {
    clearTimeout(this.state.proactiveChatTimer)
  }

  componentDidUpdate (prevProps) {
    // If path changes, reset proactive chat timer, assuming it hasn't already been dismissed
    if (this.props.location.pathname !== prevProps.location.pathname) {
      clearTimeout(this.state.proactiveChatTimer)
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        proactiveChatTimer: setTimeout(this.displayInvite, PROACTIVE_CHAT_TIMER),
      })
    }
  }

  displayInvite () {
    // After time has elapsed, send proactive chat invite if chat is not already open
    if (this.props.location.pathname !== '/chat' && this.props.location.pathname !== '/chat/' && !this.props.chatOpen) {
      this.setState({
        showInvite: true,
      })
    }
  }

  closeInvite () {
    this.setState({
      showInvite: false,
    })
    if (this.state.proactiveChatTimer) {
      clearTimeout(this.state.proactiveChatTimer)
    }
  }

  acceptInvite (event) {
    this.closeInvite()
    this.props.openChat(event)
  }

  render () {
    if (this.props.location.pathname === '/chat' || this.props.location.pathname === '/chat/') {
      return null
    }
    return (
      <ChatModal
        showInvite={this.state.showInvite}
        onInviteConfirm={this.acceptInvite}
        onInviteClose={this.closeInvite}
        {...this.props}
      />
    )
  }
}

ChatModalContainer.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  chatOpen: PropTypes.bool,
  openChat: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatModalContainer))
