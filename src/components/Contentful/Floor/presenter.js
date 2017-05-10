// Presenter component for a Floor content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../Link'
import '../../../static/css/global.css'
import LibMarkdown from '../../LibMarkdown'
import Building from '../Building'
import Image from '../../Image'
import * as statuses from '../../../constants/APIStatuses'
import NotFound from '../../Messages/NotFound'
import Loading from '../../Messages/Loading'
import ErrorMessage from '../../Messages/Error'

const Floor = (cfFloorEntry) => (
  <div key={ `ContentfulFloor_${cfFloorEntry.sys.id}` } className='container-fluid'>
    <h2>{ cfFloorEntry.fields.title }</h2>
    <LibMarkdown>{ cfFloorEntry.fields.shortDescription }</LibMarkdown>
    <Image cfImage={ cfFloorEntry.fields.image } />
    <Building cfBuildingEntry={ cfFloorEntry.fields.building } />
    <Link to={'/'}>Home</Link>
  </div>
)

const FloorPresenter = ({ cfFloorEntry }) => {
  switch(cfFloorEntry.status){
    case statuses.FETCHING:
      return <Loading/>
    case statuses.SUCCESS:
      return Floor(cfFloorEntry.json)
    case statuses.NOT_FOUND:
      return <NotFound/>
    default:
      return <ErrorMessage message={ 'There was an error loading the information for the requested floor.' }/>
  }
}

FloorPresenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired
}

export default FloorPresenter
