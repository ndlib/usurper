import React from 'react'

const Chat = () => {
  return (
    <section className='chat' aria-label='Chat with Us'>
      <div className='libraryh3lp'>
        <iframe
          title="Chat with Us"
          src='https://libraryh3lp.com/chat/nd-ask-a-lib@chat.libraryh3lp.com?skin=10273&amp;theme=gota&amp;title=Chat%20with%20us&amp;identity=asklib&amp;css=https://www.library.nd.edu/local_css/chat.css'
          frameBorder={0}
          style={{
            width: '100%',
            height:' 45vh',
            border: '0px',
            inset: '#2a4480',
          }}
          />
      </div>
    </section>
  )
}

export default Chat
