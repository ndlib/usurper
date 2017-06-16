import React from 'react'
import PageTitle from '../PageTitle'
import SearchProgramaticSet from '../SearchProgramaticSet'

const Chat = () => {
  return (
    <div className='chat'>
      <h1>Chat with a Librarian</h1>
      <br />
      <p>Chat is normally staffed 9:00 a.m. to 10:00 p.m.</p>
      <div>
        <div className='libraryh3lp'>
          <iframe
            src='https://libraryh3lp.com/chat/nd-ask-a-lib@chat.libraryh3lp.com?skin=10273&amp;theme=gota&amp;title=Ask%20a%20Librarian&amp;identity=asklib&amp;css=https://www.library.nd.edu/local_css/chat.css'
            frameBorder={0}
            style={{
              width: '100%',
              height:' 600px',
              border: '0px',
              inset: '#2a4480',
            }}
          />
        </div>
      </div>
      <PageTitle title='Chat with a Librarian' />
      <SearchProgramaticSet open={false} />
    </div>
  )
}

export default Chat
