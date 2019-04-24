import React from 'react'
import PageTitle from 'components/Layout/PageTitle'
import Chat from '../Chat'
import SearchProgramaticSet from 'components/SearchProgramaticSet'

const ChatPage = () => {
  return (
    <div className='chat-page'>
      <PageTitle title='Chat with us' />
      <SearchProgramaticSet open={false} />
      <p>Chat is normally staffed 9:00 a.m. to 10:00 p.m.</p>
      <Chat />
    </div>
  )
}

export default ChatPage
