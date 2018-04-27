// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Image from '../../Image'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'
import ServicePoint from '../ServicePoint'

const FloorPresenter = ({ cfFloorEntry, cfServicePoint, extraData }) => (
  <div key={`ContentfulFloor_${cfFloorEntry.sys.id}`} className='container-fluid'>
    <PageTitle title={cfFloorEntry.fields.title} />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <div className='col-md-8 col-sm-7 floor'>
        {
          Object.keys(extraData).length > 0 && (
            <div className='item-data'>
              <p><i>{extraData.title}</i>. {extraData.author}</p>
              <strong>{extraData.call_number}</strong>
              <p>{extraData.collection_display}</p>
            </div>
          )
        }
        <Image cfImage={cfFloorEntry.fields.image} />
      </div>
      <div className='col-md-4 col-sm-5 col-xs-12 right'>
        <LibMarkdown>{cfFloorEntry.fields.shortDescription}</LibMarkdown>
        { cfFloorEntry.fields.callNumberRange && (<p>Call Number Ranges: {cfFloorEntry.fields.callNumberRange}</p>) }
        <ServicePoint cfServicePoint={cfServicePoint} />
      </div>
    </div>
  </div>
)

FloorPresenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired,
  cfServicePoint: PropTypes.object,
  extraData: PropTypes.object.isRequired,
}

export default FloorPresenter
