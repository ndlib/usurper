// Presenter component for a Page content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Related from '../../Related'
import Image from '../../Image'
import Librarians from '../../Librarians'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import CurrentHours from '../../Hours/Current'


const PagePresenter = ({ cfPageEntry }) => (
  <div className='container-fluid content-area'>
    <PageTitle title={cfPageEntry.fields.title} />
    <SearchProgramaticSet open={cfPageEntry.fields.searchPanelOpen} />
    <h2>{ cfPageEntry.fields.title }</h2>
    <hr />
    <div className='row'>
      <div className='col-md-8'>
        <LibMarkdown>{ cfPageEntry.fields.body }</LibMarkdown>
        <Image cfImage={cfPageEntry.fields.image} className='cover' />
        <Related className='p-resources' title='Resources'>{ cfPageEntry.fields.relatedResources }</Related>
        <Related className='p-guides'>{ cfPageEntry.fields.libguides }</Related>
        <Related className='p-services' title='Services'>{ cfPageEntry.fields.relatedServices }</Related>
      </div>
      <div className='col-md-4 right'>
        <Librarians netids={cfPageEntry.fields.contactPeople} />
        {cfPageEntry.fields.servicePoint && <CurrentHours jsonHoursApiKey={cfPageEntry.fields.servicePoint.fields.hoursCode} />}
      </div>
    </div>
  </div>
)

PagePresenter.propTypes = {
  cfPageEntry: PropTypes.object.isRequired,
}

export default PagePresenter
