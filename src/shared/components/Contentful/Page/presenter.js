// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'markdown-to-jsx'
import './style.css'

const Loading = (
  <span>loading</span>
)
const Loaded = (cfPageEntry) => (
  <div className={'ContentfulPage'}>
    <div>{ cfPageEntry.fields.url }</div>
    <h1>{ cfPageEntry.fields.title }</h1>
    <Markdown>{cfPageEntry.fields.shortContent}</Markdown>
    <Markdown>{cfPageEntry.fields.content}</Markdown>
  </div>
)
const Error = (
  <span>Error</span>
)

const Presenter = ({ cfPageEntry }) => {
  if (cfPageEntry.isFetching) {
    return Loading
  }
  if(cfPageEntry.status === 'success') {
    return Loaded(cfPageEntry.json)
  } else {
    return Error
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
