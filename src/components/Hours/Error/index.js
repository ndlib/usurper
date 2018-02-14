import React from 'react'
import PropTypes from 'prop-types'

const servicePointExists = (props) => {
  return (props.hoursEntry && props.hoursEntry.servicePoint && props.hoursEntry.servicePoint.phoneNumber)
}

const Error = (props) => {
  let title = 'circulation desk'
  let phone = '(574) 631-6679'
  if (servicePointExists(props)) {
    title = props.hoursEntry.servicePoint.title
    phone = props.hoursEntry.servicePoint.phoneNumber
  }
  return (
    <section className='hours-display'><h2>The hours are currently unavailable. <br />Please call the {title} at {phone}.</h2></section>
  )
}

Error.propTypes = {
  hoursEntry: PropTypes.object.isRequired,
}

export default Error
