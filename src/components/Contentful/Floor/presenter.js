// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Building from '../Building'
import Image from '../../Image'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const FloorPresenter = ({ cfFloorEntry, extraData }) => (
  <div key={`ContentfulFloor_${cfFloorEntry.sys.id}`} className='container-fluid'>
    <PageTitle title={cfFloorEntry.fields.title} />
    <SearchProgramaticSet open={false} />
    <div className='row'>
      <div className='col-md-9 col-xs-12 floor'>
        {
          Object.keys(extraData).length > 0 && (
            <div className='item-data'>
              <h2>{extraData.title}</h2>
              <p className='author'>{extraData.author}</p>
              <p className='callNumber'>{extraData.call_number}</p>
              <p className='collection'>{extraData.collection_display}</p>
            </div>
          )
        }
        <Image cfImage={cfFloorEntry.fields.image} />
      </div>
      <div className='col-md-3 col-sxs-12 building'>
        <LibMarkdown>{cfFloorEntry.fields.shortDescription}</LibMarkdown>
        { cfFloorEntry.fields.callNumberRange && (<p>Call Number Ranges: {cfFloorEntry.fields.callNumberRange}</p>) }
        <Building cfBuildingEntry={cfFloorEntry.fields.building} />
      </div>
    </div>
  </div>
)

FloorPresenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired,
  extraData: PropTypes.object,
}

export default FloorPresenter
