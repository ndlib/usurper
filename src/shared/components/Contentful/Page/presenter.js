// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Loading = (
  <span>loading</span>
)
const Loaded = (cfPageEntry) => (
  <div className={'ContentfulPage'}>
    <div>{ cfPageEntry.fields.url }</div>
    <h1>{ cfPageEntry.fields.title }</h1>
    <h2>
      <div>{ cfPageEntry.fields.shortContent }</div>
      <div>{ cfPageEntry.fields.content }</div>
    </h2>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  if (cfPageEntry.isFetching) {
    return Loading
  }
  return Loaded(cfPageEntry.json)
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
