import React from 'react'
import PropTypes from 'prop-types'
import typy from 'typy'

const servicePointExists = (props) => {
  return typy(props, 'hoursEntry.servicePoint.phoneNumber').isTruthy
}

const Error = (props) => {
  const title = servicePointExists(props) ? typy(props, 'hoursEntry.servicePoint.title').safeString : 'circulation desk'
  const phone = servicePointExists(props) ? typy(props, 'hoursEntry.servicePoint.phoneNumber').safeString : '(574) 631-6679'
  return (
    <section className='hours-display'>
      <h2>The hours are currently unavailable. <br />Please call the {title} at {phone}.</h2>
    </section>
  )
}

Error.propTypes = {
  hoursEntry: PropTypes.shape({
    servicePoint: PropTypes.shape({
      title: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
  }).isRequired,
}

export default Error
