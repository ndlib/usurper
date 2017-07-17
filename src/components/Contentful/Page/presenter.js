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
import PageAlert from '../Alert/Page'

const PagePresenter = ({ cfPageEntry }) => (
  <div className='container-fluid content-area'>
    <PageTitle title={cfPageEntry.fields.title} />
    <PageAlert alert={cfPageEntry.fields.alert} />
    <SearchProgramaticSet open={cfPageEntry.fields.searchPanelOpen} />
    <div className='row'>
      <section className='col-md-8 col-sm-7'>

        <LibMarkdown>{ cfPageEntry.fields.body }</LibMarkdown>

        <Related className='p-resources' title='Resources' showImages={false}>{ cfPageEntry.fields.relatedResources }</Related>
        <Related className='p-guides' title='Guides' showTitle={false} showImages={false}>{ cfPageEntry.fields.libguides }</Related>
        <Related className='p-services' title='Services'>{ cfPageEntry.fields.relatedServices }</Related>
      </section>
      <section className='col-md-4 col-sm-5 col-xs-12 right' role='complementary'>
        <Image cfImage={cfPageEntry.fields.image} className='cover' />
        <PageLink className='button callout' cfPage={cfPageEntry.fields.callOutLink} />
        <Librarians netids={cfPageEntry.fields.contactPeople} />
        {cfPageEntry.fields.servicePoint && <CurrentHours jsonHoursApiKey={cfPageEntry.fields.servicePoint.fields.hoursCode} />}
        <Contact servicePoint={cfPageEntry.fields.servicePoint} />
        <Related className='p-pages' title='Related Pages' showImages={false}>{ cfPageEntry.fields.relatedPages }</Related>
      </section>
    </div>
  </div>
)

PagePresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}

export default PagePresenter
