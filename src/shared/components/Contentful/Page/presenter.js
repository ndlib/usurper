// Presenter component for a Page content type from Contentful
import React, { PropTypes } from 'react'
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

const Presenter = ({ cfPageEntry }) => {
  if (!cfPageEntry.isFetching && cfPageEntry.json) {
    return Loaded(cfPageEntry.json)
  }
  return Loading
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
