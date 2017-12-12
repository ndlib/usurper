// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrentHours from '../../Hours/Current'
import Contact from '../../Contact/ServicePoint'

const ServicePoint = ({ cfServicePoint, showHours }) => {
  if (!cfServicePoint) {
    return null
  }

  return (
    <section
      aria-label={'Service Point: ' + cfServicePoint.fields.title}
      role='complementary'
      className='sp-address'
      itemScope
      itemType='http://schema.org/Place'
    >
      <h3 itemProp='name'>{cfServicePoint.fields.title}</h3>
      <h4 itemProp='streetAddress'>{cfServicePoint.fields.address}</h4>

      { showHours && <CurrentHours servicePoint={cfServicePoint} /> }
      <Contact servicePoint={cfServicePoint} />
    </section>
  )
}

ServicePoint.PropTypes = {
  cfServicePoint: PropTypes.object.isRequired,
  showHours: PropTypes.bool,
}

ServicePoint.defaultProps = {
  showHours: true,
}

export default ServicePoint
