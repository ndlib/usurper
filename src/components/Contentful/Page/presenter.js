// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import * as statuses from '../../../constants/APIStatuses'
import NotFound from '../../Messages/NotFound'
import Loading from '../../Messages/Loading'
import ErrorMessage from '../../Messages/Error'

const Page = (cfPageEntry) => (
  <div className='container-fluid'>
    <h2>{ cfPageEntry.fields.title }</h2>
    <LibMarkdown>{ cfPageEntry.fields.content }</LibMarkdown>
    <Image cfImage={cfPageEntry.fields.image} className='cover' />
    <Related className='p-resources'>{ cfPageEntry.fields.relatedResources }</Related>
    <Related className='p-guides'>{ cfPageEntry.fields.libguides }</Related>
    <Related className='p-services'>{ cfPageEntry.fields.relatedServices }</Related>
    <div><Link to={'/'}>Home</Link></div>
  </div>
)

const Presenter = ({ cfPageEntry }) => {
  switch(cfPageEntry.status){
    case statuses.FETCHING:
      return <Loading/>
    case statuses.SUCCESS:
      return Page(cfPageEntry.json)
    case statuses.NOT_FOUND:
      return <NotFound/>
    default:
      return <ErrorMessage message={ 'There was an error loading the page.' }/>
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default Presenter
