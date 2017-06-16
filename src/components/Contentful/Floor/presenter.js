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

const FloorPresenter = ({ cfFloorEntry }) => (
  <div key={`ContentfulFloor_${cfFloorEntry.sys.id}`} className='container-fluid'>
    <PageTitle title={cfFloorEntry.fields.title} />
    <SearchProgramaticSet open={false} />
    <h2>{cfFloorEntry.fields.title}</h2>
    <LibMarkdown>{cfFloorEntry.fields.shortDescription}</LibMarkdown>
    <Image cfImage={cfFloorEntry.fields.image} />
    <Building cfBuildingEntry={cfFloorEntry.fields.building} />
    <Link to={'/'}>Home</Link>
  </div>
)

FloorPresenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired,
}

export default FloorPresenter
