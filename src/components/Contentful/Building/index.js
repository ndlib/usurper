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
    <h2>{ cfBuildingEntry.fields.title }</h2>
    <Image cfImage={cfBuildingEntry.fields.image} />
    <Link to={cfBuildingEntry.fields.mapLink}>Map</Link>
  </div>
)

BuildingPresenter.propTypes = {
  cfBuildingEntry: PropTypes.object.isRequired,
}

export default BuildingPresenter
