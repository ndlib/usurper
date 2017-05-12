// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'

const PagePresenter = (cfPageEntry) => (
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

PagePresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired
}

export default PagePresenter
