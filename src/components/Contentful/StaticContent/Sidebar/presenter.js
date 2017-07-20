// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../../static/css/global.css'
import LibMarkdown from '../../../LibMarkdown'
import PageLink from '../../PageLink'
import Librarians from '../../../Librarians'
import Related from '../../../Related'
import ServicePoint from '../../../Contentful/ServicePoint'


const Presenter = ({ cfStatic }) => (
  <div key={`ContentfulSidebar_${cfStatic.sys.id}`} className='col-md-4 col-sm-5 col-xs-12 right'>
    <PageLink className='button callout' cfPage={cfStatic.fields.callOutLink} />
    <LibMarkdown>{cfStatic.fields.shortDescription}</LibMarkdown>
    <Librarians netids={cfStatic.fields.contactPeople} />
    <ServicePoint cfServicePoint={cfStatic.fields.servicePoint } />
    <Related className='p-pages' title='Related Pages' showImages={false}>{ cfStatic.fields.relatedPages }</Related>
  </div>
)

Presenter.propTypes = {
  cfStatic: PropTypes.object.isRequired,
}

export default Presenter
