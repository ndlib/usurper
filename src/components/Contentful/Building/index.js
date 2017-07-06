// Presenter component for a Building content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import Link from '../../Link'
import Image from '../../Image'
import PageTitle from '../../PageTitle'
import SearchProgramaticSet from '../../SearchProgramaticSet'

const BuildingPresenter = ({ cfBuildingEntry }) => (
  <div key={`ContentfulBuilding_${cfBuildingEntry.sys.id}`} >
    <PageTitle title={cfBuildingEntry.fields.title} />
    <SearchProgramaticSet open={false} />
    <h3>{ cfBuildingEntry.fields.title }</h3>
    <Image cfImage={cfBuildingEntry.fields.image} />
    <div className='point'><address className='building'><Link to={cfBuildingEntry.fields.mapLink} className='map'>Campus Map</Link></address></div>
  </div>
)

BuildingPresenter.propTypes = {
  cfBuildingEntry: PropTypes.object.isRequired,
}

export default BuildingPresenter
