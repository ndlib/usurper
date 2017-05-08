// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../LibLink'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'

const Loading = (
  <span>loading</span>
)
const Loaded = (cfPageEntry) => (
  <div className='container-fluid'>
    <h2>{ cfPageEntry.fields.title }</h2>
    <LibMarkdown>{ cfPageEntry.fields.shortContent }</LibMarkdown>
    <LibMarkdown>{ cfPageEntry.fields.content }</LibMarkdown>
    <Image cfImage={cfPageEntry.fields.image} className='cover' />
    <Related className='p-resources'>{ cfPageEntry.fields.relatedResources }</Related>
    <Related className='p-guides'>{ cfPageEntry.fields.libguides }</Related>
    <Related className='p-services'>{ cfPageEntry.fields.relatedServices }</Related>
    <div><Link to={'/'}>Home</Link></div>
  </div>
)
const ErrorLoading = (
  <span>Error</span>
)

const NotFound = (
  <div className={'NotFound'}>
    <h1>Page Not Found</h1>
    <div>The requested page could not be found</div>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  if (cfPageEntry.isFetching) {
    return Loading
  }
  if (cfPageEntry.status === 'success') {
    return Loaded(cfPageEntry.json)
  } else if (cfPageEntry.status === 'not found') {
    return NotFound
  } else {
    return ErrorLoading
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
