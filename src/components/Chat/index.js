import React from 'react'

const Chat = () => {
  return (
    <section className='chat' aria-label='Chat with a librarian'>
      <div className='skiplink'>
        Phone Number: <a href='tel:5746316679' aria-label='Call (574) 631-6679'>(574) 631-6679</a>
      </div>
      <div className='libraryh3lp needs-js' aria-hidden='true' data-lh3-jid='nd-ask-a-lib@chat.libraryh3lp.com'>
        <iframe
          src='https://libraryh3lp.com/chat/nd-ask-a-lib@chat.libraryh3lp.com?skin=10273'
          title='Chat with a librarian'
          frameBorder='0'
          style={{ width: '100%', height: '425px', border: 0 }}
        />
      </div>
    </section>
  )
}

export default Chat
