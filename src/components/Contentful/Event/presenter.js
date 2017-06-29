// Presenter component for a Event content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const PagePresenter = ({ entry }) => (
  <div className='container-fluid content-area'>
    <PageTitle title={entry.fields.title} />
    <SearchProgramaticSet open={false} />
    <h2>{ entry.fields.title } </h2>

    <hr />
    <div className='row'>
      <div className='col-md-8'>
        <LibMarkdown>{ entry.fields.content }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
      </div>
      <div className='col-md-4 right'>
        <Image cfImage={entry.fields.image} className='cover' />
        <Librarians netids={entry.fields.contactPeople} />
        <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.fields.relatedPages }</Related>
      </div>
    </div>
  </div>
)

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
