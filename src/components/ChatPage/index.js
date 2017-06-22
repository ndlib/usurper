import React from 'react'
import PageTitle from '../PageTitle'
import Chat from '../Chat'
import SearchProgramaticSet from '../SearchProgramaticSet'

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <h1>Chat with a Librarian</h1>
      <br />
      <p>Chat is normally staffed 9:00 a.m. to 10:00 p.m.</p>
      <Chat />
      <PageTitle title='Chat with a Librarian' />
      <SearchProgramaticSet open={false} />
    </div>
  )
}

export default ChatPage
