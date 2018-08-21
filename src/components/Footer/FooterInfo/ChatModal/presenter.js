import React from 'react'
import Chat from '../../../Chat'
import ChatImage from '../../images/ask.svg'

const ChatModal = (props) => {
  let buttonMessage = (<span><img src={ChatImage} alt='' aria-hidden='true' /> Chat with us</span>)
  if (props.chatOpen) {
    buttonMessage = (<span>Hide Chat</span>)
  }
  return (
    <div
      id='chat'
      className='footer-chat'>
      <a
        className='chat-button'
        onClick={props.onClick}
        onKeyDown={props.onKeyDown}
        tabIndex='0'
        href='/chat'
        role='button'
        aria-selected={props.chatOpen}
        aria-haspopup='true'
        aria-owns='chat-modal'
        aria-expanded={props.chatOpen}
      >{buttonMessage}</a>
      <div id='chat-modal' role='tabpanel' className={props.chatOpen ? 'chat-open' : 'hidden'}><Chat /></div>
    </div>
  )
}

export default ChatModal
