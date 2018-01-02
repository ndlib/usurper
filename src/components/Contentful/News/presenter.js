// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Contact from '../../Contact/ServicePoint'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import CurrentHours from '../../Hours/Current'
import PageLink from '../PageLink'

const PagePresenter = ({ entry }) => (
  <article
    className='container-fluid content-area'
    itemScope
    itemType='http://schema.org/NewsArticle'
    itemProp='mainEntity'
  >
    {entry.fields.shortDescription && (<meta name='description' content={entry.fields.shortDescription} />) }
    <PageTitle title={entry.fields.title} itemProp='headline' />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <main className='col-md-8 col-sm-8 article'>
        <LibMarkdown itemProp='articleBody'>{ entry.fields.content }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
      </main>
      <asside className='col-md-4 col-sm-4 right news'>
        <Image cfImage={entry.fields.image} className='cover' itemProp='image' />
        <Librarians netids={entry.fields.contactPeople} />
        <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.fields.relatedPages }</Related>
      </asside>
    </div>
  </article>
)

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
