// Presenter component for a Event content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Link from '../../Link'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import ServicePoint from '../ServicePoint'

const PagePresenter = ({ entry }) => (
  <article
    className='container-fluid content-area'
    itemScope
    itemType='http://schema.org/Event'
    itemProp='mainEntity'
  >
    {entry.fields.shortDescription && (<meta name='description' content={entry.fields.shortDescription} />) }
    <meta itemProp='startDate' content={entry.fields.startDate} />
    <meta itemProp='endDate' content={entry.fields.endDate} />
    <PageTitle title={entry.fields.title} itemProp='name' />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <main className='col-md-8'>
        <p>{entry.fields.hoursDisplay}</p>
        <LibMarkdown itemProp='description'>{ entry.fields.content }</LibMarkdown>
        <Related className='p-resources' title='Resources' showImages={false}>{ entry.fields.relatedResources }</Related>
      </main>
      <aside className='col-md-4 right'>
        <Image cfImage={entry.fields.representationalImage} className='cover' />
        <Link to={entry.fields.registrationUrl} className='button callout' hideIfNull>Register Here</Link>
        <Librarians netids={entry.fields.contactPeople} />
        <ServicePoint cfServicePoint={entry.fields.location} showHours={false} />
        <Related className='p-pages' title='Related Pages' showImages={false}>{ entry.fields.relatedPages }</Related>
      </aside>
    </div>
  </article>
)

PagePresenter.propTypes = {
  entry: PropTypes.object.isRequired,
}

export default PagePresenter
