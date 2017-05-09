// Presenter component for a Building content type from Contentful
import React from 'react'
import PropTypes from 'prop-types'
import '../../../static/css/global.css'
import GoogleMap from '../../GoogleMap'
import Image from '../../Image'

const Presenter = ({ cfBuildingEntry }) => (
  <div>
    <h2>{ cfBuildingEntry.fields.title }</h2>
    <Image cfImage={ cfBuildingEntry.fields.image } />
    <GoogleMap src={ cfBuildingEntry.fields.mapLink } />
  </div>
)

Presenter.propTypes = {
  cfBuildingEntry: PropTypes.object.isRequired
}

export default Presenter
