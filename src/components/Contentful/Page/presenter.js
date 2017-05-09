// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'
import * as statuses from '../../../constants/APIStatuses'
import NotFound from '../../Messages/NotFound'
import Loading from '../../Messages/Loading'
import Error from '../../Messages/Error'

const Page = (cfPageEntry) => (
  <div className='container-fluid'>
    <h2>{ cfPageEntry.fields.title }</h2>
    <hr />
    <div className='row'>
      <div className='col-md-9'>
        <LibMarkdown>{ cfPageEntry.fields.content }</LibMarkdown>
        <Image cfImage={cfPageEntry.fields.image} className='cover' />
        <Related className='p-resources' title='Resources'>{ cfPageEntry.fields.relatedResources }</Related>
        <Related className='p-guides'>{ cfPageEntry.fields.libguides }</Related>
        <Related className='p-services' title='Services'>{ cfPageEntry.fields.relatedServices }</Related>
      </div>
      <div className='col-md-3 right'>
        <Librarians netids={ cfPageEntry.fields.contactPeople } />
      </div>
    </div>
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
      return <Error message={ 'There was an error loading the page.' }/>
  }
}

Presenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}

export default Presenter
