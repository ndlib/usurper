import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from 'components/Layout/PageTitle'
import Chat from '../Chat'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'

const ChatPage = (props) => {
  const slug = 'chat'
  const preview = (new URLSearchParams(props.location.search)).get('preview') === 'true'

  return (
    <div className='chat-page'>
      <PageTitle title='Chat with a librarian' />
      <SearchProgramaticSet open={false} />
      <StaticAlert slug={slug} preview={preview} hideLoading />
      <StaticBody slug={slug} preview={preview} showDescription>
        <Chat />
      </StaticBody>
    </div>
  )
}

ChatPage.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default ChatPage
