import React from 'react'
import { connect } from 'react-redux'
import ChatModal from './presenter.js'
import {
  openChat,
  closeChat,
} from '../../../../actions/chat.js'

const mapStateToProps = (state, ownProps) => {
  return { chatOpen: state.chat.chatOpen }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    openChat: (e) => {
      dispatch(openChat())
    },
    closeChat: (e) => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(ChatModal)
