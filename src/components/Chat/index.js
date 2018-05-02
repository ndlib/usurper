import React from 'react'

const Chat = () => {
  return (
    <section className='chat' aria-label='Chat with Us'>
      <div className='skiplink'>
        Phone Number: <a href="tel:5746316679" aria-label="Call (574) 631-6679">(574) 631-6679</a>
      </div>
      <div className='libraryh3lp' aria-hidden='true'>
        <iframe
          title="Chat with Us"
          src='https://libraryh3lp.com/chat/nd-ask-a-lib@chat.libraryh3lp.com?skin=10273'
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
