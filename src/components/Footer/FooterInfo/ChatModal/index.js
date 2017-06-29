import React from 'react'
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
  return {
    openChat: (e) => {
      e.preventDefault()
      dispatch(openChat())
    },
    closeChat: (e) => {
      e.preventDefault()
      dispatch(closeChat())
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

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatModal))
