import React from 'react'
import Chat from '../../../Chat'
import ChatImage from '../../images/chat.png'

const ChatModal = (props) => {
  let buttonMessage = (<span><img src={ChatImage} /> Chat with us</span>)
  if (props.chatOpen) {
    buttonMessage = (<span>Hide Chat</span>)
  }
  return (
    <div id='chat' className='footer-chat'>
      <a className='chat-button' onClick={props.onClick}>{buttonMessage}</a>
      <div className={props.chatOpen ? 'chat-open' : 'hidden'}><Chat /></div>
    </div>
  )
}

export default ChatModal
