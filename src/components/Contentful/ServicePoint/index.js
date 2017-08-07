// Container component for a Page content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CurrentHours from '../../Hours/Current'
import Contact from '../../Contact/ServicePoint'

const ServicePoint = ({ cfServicePoint }) => {
  if (!cfServicePoint) {
    return null
  }

  return (
    <section aria-label={'Service Point: ' + cfServicePoint.fields.title} role='complementary' className='sp-address'>
      <h3>{cfServicePoint.fields.title}</h3>
      <h4>{cfServicePoint.fields.address}</h4>

      <CurrentHours servicePoint={cfServicePoint} />
      <Contact servicePoint={cfServicePoint} />
    </section>
  )
}

ServicePoint.PropTypes = {
  cfServicePoint: PropTypes.object.isRequired,
}

export default ServicePoint
