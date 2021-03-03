import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import ChatModal from './presenter.js'
import {
  openChat,
  closeChat,
} from 'actions/chat.js'
import { getChatOptOut, KIND as SETTINGS_KIND } from 'actions/personal/settings'
import * as statuses from 'constants/APIStatuses'

// ms on a single page before proactive chat invitation pops up
const PROACTIVE_CHAT_TIMER = 1000 * 60 * 3

export const mapStateToProps = (state, ownProps) => {
  const { chat, personal, settings } = state
  return {
    chatOpen: chat.chatOpen,
    // On keydown we open chat page instead of modal for accessibiilty.
    onKeyDown: (e) => {
      if (e.keyCode === 13) {
        e.preventDefault()
        ownProps.history.push('/chat')
      }
    },
    isLoggedIn: !!(personal.login.token),
    chatOptOut: [true, 'true'].includes(settings[SETTINGS_KIND.chatOptOut].data),
    chatOptOutFetchStatus: settings[SETTINGS_KIND.chatOptOut].state,
    isChatPage: ['/chat', '/chat/'].includes(ownProps.location.pathname.toLowerCase()),
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const onClick = (e, func) => {
    e.preventDefault()
    if (ownProps.location.pathname.toLowerCase() === '/chat' || ownProps.location.pathname.toLowerCase() === '/chat/') {
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
    ...bindActionCreators({ getChatOptOut }, dispatch),
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

  componentDidUpdate () {
    if (this.props.isLoggedIn && this.props.chatOptOutFetchStatus === statuses.NOT_FETCHED) {
      this.props.getChatOptOut()
    }
  }

  componentWillUnmount () {
    clearTimeout(this.state.proactiveChatTimer)
  }

  displayInvite () {
    // After time has elapsed, send proactive chat invite if chat is not already open
    if (!this.props.isChatPage && !this.props.chatOpen) {
      // Make sure the user has not previously dismissed proactive chat
      let showInvite = true
      try {
        // It stores a date, which could be used to remember the setting for a certain period of time, like 30 days
        const lastDismissed = window.localStorage.getItem('proactiveChatDismiss')
        if (lastDismissed || this.props.chatOptOut) {
          showInvite = false
        }
      } catch (e) {
        console.warn('Local storage is not available.')
      }

      this.setState({
        showInvite,
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
    if (this.props.isChatPage) {
      return null
    }
    return (
      <ChatModal
        showInvite={this.state.showInvite}
        onInviteConfirm={this.acceptInvite}
        onInviteClose={this.closeInvite}
        {...this.props}
        onClick={(e) => {
          this.setState({
            showInvite: false,
          })
          this.props.onClick(e)
        }}
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
  onClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  chatOptOut: PropTypes.bool,
  chatOptOutFetchStatus: PropTypes.string,
  isChatPage: PropTypes.bool,
  getChatOptOut: PropTypes.func,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatModalContainer))
