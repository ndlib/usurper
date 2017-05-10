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
import Error from '../../Messages/Error'

const Floor = (cfFloorEntry) => (
  <div className='container-fluid'>
    <h2>{ cfFloorEntry.fields.title }</h2>
    <LibMarkdown>{ cfFloorEntry.fields.shortDescription }</LibMarkdown>
    <Image cfImage={ cfFloorEntry.fields.image } />
    <Building cfBuildingEntry={ cfFloorEntry.fields.building } />
    <div>
      <Link to={'/'}>Home</Link>
    </div>
  </div>
)

const Presenter = ({ cfFloorEntry }) => {
  switch(cfFloorEntry.status){
    case statuses.FETCHING:
      return <Loading/>
    case statuses.SUCCESS:
      return Floor(cfFloorEntry.json)
    case statuses.NOT_FOUND:
      return <NotFound/>
    default:
      return <Error message={ 'There was an error loading the information for the requested floor.' }/>
  }
}

Presenter.propTypes = {
  cfFloorEntry: PropTypes.object.isRequired
}

export default Presenter
