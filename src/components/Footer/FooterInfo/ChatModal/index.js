import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ChatModal from './presenter.js'
import {
  openChat,
  closeChat,
} from '../../../../actions/chat.js'

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
  render () {
    console.log(this.props.location)
    if (this.props.location.pathname === '/chat' || this.props.location.pathname === '/chat/') {
      return null
    }
    return <ChatModal {...this.props} />
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatModalContainer))
