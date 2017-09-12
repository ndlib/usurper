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
  <div
    className='container-fluid content-area'
    itemScope
    itemType='http://schema.org/Event'
    itemProp='mainEntity'
  >
    <meta itemProp='startDate' content={entry.fields.startDate} />
    <meta itemProp='endDate' content={entry.fields.endDate} />
    <PageTitle title={entry.fields.title} itemProp='name' />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <div className='col-md-8'>
        <LibMarkdown itemProp='description'>{ entry.fields.content }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
      </div>
      <div className='col-md-4 right'>
        <Image cfImage={entry.fields.representationalImage} className='cover' />
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
