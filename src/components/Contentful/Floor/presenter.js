// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import 'static/css/global.css'
import LibMarkdown from 'components/LibMarkdown'
import Image from 'components/Image'
import PageTitle from 'components/Layout/PageTitle'
import SearchProgramaticSet from 'components/SearchProgramaticSet'
import ServicePoint from '../ServicePoint'
import SearchCallout from './SearchCallout'
import mapkey from 'static/images/key.svg'

const FloorPresenter = ({ cfFloorEntry, cfServicePoint, servicePointSlug, location }) => (
  <div key={`ContentfulFloor_${cfFloorEntry.sys.id}`} className='container-fluid floorplan'>
    <PageTitle title={cfFloorEntry.fields.building.fields.title + ' ' + cfFloorEntry.fields.title} />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <div className='col-md-8 col-sm-7 floor'>
        <SearchCallout location={location} />

        <Image cfImage={cfFloorEntry.fields.image} className='floor-map' containerClassName='block' />
      </div>
      <div className='col-md-4 col-sm-5 col-xs-12 right floor-info'>
        <ServicePoint cfServicePoint={cfServicePoint} slug={servicePointSlug} />
        <LibMarkdown>{cfFloorEntry.fields.shortDescription}</LibMarkdown>
        { cfFloorEntry.fields.callNumberRange && (<p>Call Number Ranges: {cfFloorEntry.fields.callNumberRange}</p>) }
        <p>&nbsp;</p>
        <h2 className='mapkey'>Map Key</h2>
        <img
          src={mapkey}
          alt='map key'
          className='mapkey'
        />
      </div>
    </div>
  </div>
)

FloorPresenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired,
  cfServicePoint: PropTypes.object,
  servicePointSlug: PropTypes.string,
  location: PropTypes.object.isRequired,
}

export default FloorPresenter
