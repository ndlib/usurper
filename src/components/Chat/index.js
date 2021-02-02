import React from 'react'
import { Helmet } from 'react-helmet'

const Chat = () => {
  return (
    <section className='chat' aria-label='Chat with a librarian'>
      <div className='skiplink'>
        Phone Number: <a href='tel:5746316679' aria-label='Call (574) 631-6679'>(574) 631-6679</a>
      </div>
      <div className='libraryh3lp needs-js' aria-hidden='true' />
      <Helmet>
        <script type='text/javascript' src='https://libraryh3lp.com/js/libraryh3lp.js?16990' async />
      </Helmet>
    </section>
  )
}

export default Chat
